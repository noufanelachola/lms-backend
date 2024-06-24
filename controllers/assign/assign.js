const assign = async(req,res,db) => {
    const {schoolId,bookId,studentId} = req.body;

    const studentExists = await db.from("students")
        .where({ studentid: studentId, schoolid: schoolId })
        .first();
        
    if(!studentExists){
        return res.json("Student doesnot exist");
    }
    
    const bookExists = await db.from("books")
        .where({ bookid: bookId, schoolid: schoolId })
        .first();
    
    if(!bookExists){
        return res.json("Book doesnot exist");
    }
    
    const bookAvailable = await db.from("books")
        .select("availablecopies").where({ bookid: bookId, schoolid: schoolId })
        .first();
    
    
    if(bookAvailable.availablecopies === 0){
        return res.json("No available copies");
    }    

    db.transaction(trx => {
        trx.insert({
            schoolid : schoolId,
            studentid : studentId,
            bookid : bookId
        })
        .into("transactions")
        .returning("*")
        .then(trans => {
            return trx("books")
                .where({schoolid : schoolId, bookid : bookId})
                .decrement("availablecopies",1).increment("taken",1)
                .then(() => {
                    return trx("students")
                    .where({schoolid : schoolId, studentid : studentId})
                    .increment("taken",1)
                    .then(() => {
                        res.json(trans[0]);
                        trx.commit();
                    })
                })
        }).catch(error => {
            trx.rollback();
            res.status(400).json("Couldnt transact");
            console.log(error);
        });
    });
    
}
module.exports = {
    assign
}