

const handleStudentDelete = async (req,res,db) => {
    const {schoolId,studentId} = req.query;
    
    // let pending = db.select("*")
    //     .from("transactions")
    //     .where({schoolid:schoolId,studentid:studentId,status:"pending"})
    
    // if(pending.length){
    //     res.json("Student has books to return")
    // } else {
    //     db.transaction(trx => {
    //         trx("transactions")
    //         .where({schoolid:schoolId,studentid:studentId})
    //         .del().then(() => {
    //             db.transaction(trx2 => {
    //                 trx2("students")
    //                 .where({schoolid:schoolId,studentid:studentId})
    //                 .del();
    //             })
    //         })
    //     })
    // }

    try{
        const pending = await db.select("*")
            .from("transactions")
            .where({schoolid:schoolId,studentid:studentId,status:"pending"})

        if(pending.length > 0) {
            return res.status(400).json({status:false,message:"student has books to return"});
        }    

        await db.transaction(async trx => {
            await trx('transactions')
                .where({ schoolid: schoolId, studentid: studentId })
                .del();

            await trx('students')
                .where({ schoolid: schoolId, studentid: studentId })
                .del();
        });

        res.json({status:true,message:"Deleted successfully"});

    } catch(error) {
        res.status(500).json({status:false,message:"Could not delete student"});
        console.log(error)
    }

}

module.exports = {
    handleStudentDelete
}