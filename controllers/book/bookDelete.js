

const handleBookDelete = async (req,res,db) => {
    const {schoolId,bookId} = req.query;
    
    try{
        const pending = await db.select("*")
            .from("transactions")
            .where({schoolid:schoolId,bookid:bookId,status:"pending"})

        if(pending.length > 0) {
            return res.status(400).json({status:false,message:"There are books to return"});
        }    

        await db.transaction(async trx => {
            await trx('transactions')
                .where({ schoolid: schoolId, bookid: bookId })
                .del();

            await trx('books')
                .where({ schoolid: schoolId, bookid : bookId })
                .del();
        });

        res.json({status:true,message:"Deleted successfully"});

    } catch(error) {
        res.status(500).json({status:false,message:"Could not delete book"});
        console.log(error)
    }

}

module.exports = {
    handleBookDelete
}