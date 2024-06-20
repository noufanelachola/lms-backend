const handleStudentGet = (req,res,db) => {
    const {schoolId} = req.query;

    db.from("students")
    .select("*")
    .where({schoolid : schoolId})
    .then(students => res.json(students))
    .catch(error => {
        res.status(400).json("Error fetching students");
        console.log(error);
    });

}

module.exports = {
    handleStudentGet
}