const handleStudentAdd = (req,res,db) => {
    const {schoolUsername,studentName,studentClass,admissionNumber} = req.body;

    db.insert({
            schoolusername:schoolUsername,
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