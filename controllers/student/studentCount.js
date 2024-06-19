const handleStudentCount = (req,res,db) => {
    db.select("studentid")
    .from("students")
    .then(studentid => res.json(studentid.length))
    .catch(error => console.log(error));
}

module.exports = {
    handleStudentCount
}