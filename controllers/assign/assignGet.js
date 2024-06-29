const handleAssignGet = (req,res,db) => {
    const {schoolId} = req.query;

    // db.select("*")
    // .from("transactions")
    // .where({schoolid : schoolId, status : "pending"})
    // .then(transaction => res.json(transaction))
    // .catch(error => {
    //     res.status(400).json("Error while getting assign students");
    //     console.log(error);
    // });

    db.from("transactions as t")
    .join("students as s","t.studentid","s.studentid")
    .join("books as b","t.bookid","b.bookid")
    .select(
        "t.transactionid",
        "s.studentid",
        "b.bookid",
        db.raw("TO_CHAR(t.issue_date, 'DD-MM-YYYY') as issue_date"),
        db.raw("TO_CHAR(t.due_date, 'DD-MM-YYYY') as due_date"),
        "t.status",
        "s.studentname",
        "s.studentclass",
        "s.admissionnumber",
        "b.bookname",
        "b.bookauthor"
    ).where({"t.schoolid" : schoolId,status:"pending"})
    .then(transaction => res.json(transaction))
    .catch(error => {
        res.status(400).json("couldnt get the assign students");
        console.log(error);
    })

}

module.exports = {
    handleAssignGet
}