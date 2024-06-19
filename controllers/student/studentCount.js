const handleStudentCount = (req,res,db) => {
    const {schoolId} = req.query;
    db.select("studentid")
    .where("schoolid","=",schoolId)
    .from("students")
    .then(studentid => res.json(studentid.length))
    .catch(error => console.log(error));
}

module.exports = {
    handleStudentCount
}