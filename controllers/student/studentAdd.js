const handleStudentAdd = (req,res,db) => {
    const {schoolId,studentName,studentClass,admissionNumber} = req.body;

    db.insert({
            schoolid:schoolId,
            studentname:studentName,
            studentclass:studentClass,
            admissionnumber:admissionNumber
        })
        .into("students")
        .returning("*")
        .then(student => res.json(student[0]))
        .catch(err => {
            res.status(400).json("Couldnt add student");
            console.log(err);            
        }
    );

}

module.exports = {
    handleStudentAdd
}