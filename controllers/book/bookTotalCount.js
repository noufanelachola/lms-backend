
const handleBookTotalCount = (req,res,db) => {
    const {schoolId} = req.query;
    db.from("books")
    .where({schoolid : schoolId})
    .sum("totalcopies as totalBooks")
    .then(result => res.json(result[0].totalBooks))
    .catch(error => {
        console.log(error);
        res.status(400).json("Error occured while getting totalcount of books");
    });
}

module.exports ={
    handleBookTotalCount
}