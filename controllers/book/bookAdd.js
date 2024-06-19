const handleBookAdd = (req,res,db) => {
    const {schoolId,bookName,bookAuthor,totalCopies} = req.body;

    db.transaction(trx => {
        trx.insert({
            schoolid : schoolId,
            bookname : bookName,
            bookauthor : bookAuthor,
            totalcopies : totalCopies,
            availablecopies : totalCopies
        }).into("books")
        .returning("*")
        .then(book => {
            res.json(book[0]);
            trx.commit();
        }).catch(error => {
            trx.rollback();
            res.status(400).json("Couldn't add book");
            console.log(error);
        });
    });
}

module.exports = {
    handleBookAdd
}