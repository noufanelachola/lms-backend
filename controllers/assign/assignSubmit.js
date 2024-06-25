const handleAssignSubmit = (req,res,db) => {
    const {schoolId,transactionId,bookId} = req.query;
    


    db.transaction(trx => {
        trx("transactions")
            .update({status : "submitted"})
            .where({schoolid : schoolId, transactionid : transactionId})
            .then(() => {
                return trx("books")
                .where({schoolid : schoolId, bookid : bookId})
                .increment("availablecopies",1)
                .then(() => {
                    res.json("submitted successfully");
                    trx.commit();
                })
                .catch(error => {
                    res.status(400).json("Submission failed");
                    trx.rollback();
                });
            })
    })

}

module.exports = {
    handleAssignSubmit
}