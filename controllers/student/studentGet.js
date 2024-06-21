const handleStudentGet = (req,res,db) => {
    const {schoolId,search} = req.query;

    let query = db.from("students")
    .select("*")
    .where({schoolid : schoolId})
    .orderBy("studentname");

    if(search){
        query = query.andWhere("studentname","ILIKE",`%${search}%`);
    }

    query.then(students => res.json(students))
    .catch(error => {
        res.status(400).json("Error fetching students");
        console.log(error);
    });

}

module.exports = {
    handleStudentGet
}