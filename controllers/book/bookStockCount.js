const handleBookStockCount = (req,res,db) => {
    const {schoolId} = req.query;
    db.from("books")
    .where({schoolid : schoolId})
    .sum("availablecopies as stockBooks")
    .then(result => res.json(result[0].stockBooks))
    .catch(error => {
        console.log(error);
        res.status(400).json("Errro occured while getting stockcount of books");
    });
}

module.exports = {
    handleBookStockCount
}