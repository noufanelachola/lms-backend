const handleStudentWithBooksCount = (req,res,db) => {
    const {schoolId} = req.query;

    db.from("transactions")
    .countDistinct("studentid")
    .where({schoolid : schoolId,status : "pending"})
    .then(count => {
        res.json(count[0].count);
    })
    .catch(error => {
        res.status(400).json("Error fetching student with books");
        console.log(error);
    });


}

module.exports = {
    handleStudentWithBooksCount
}