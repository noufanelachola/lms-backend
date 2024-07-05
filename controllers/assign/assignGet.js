const handleAssignGet = (req,res,db) => {
    const {schoolId,studentId,bookId,status} = req.query;

    let query = db.from("transactions as t")
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
            "b.bookauthor",
            "b.totalcopies",
            "b.availablecopies"
        ).where({"t.schoolid" : schoolId});

    if (studentId){
        query = query.andWhere("s.studentid",studentId);
    }
    else if(bookId){
        query = query.andWhere("b.bookid",bookId);
    }
    
    if (status === "pending"){
        query = query.andWhere("status","pending");
    }
    else if (status === "submitted"){
        query = query.andWhere("status","submitted");
    }

    query.then(transaction => res.json(transaction))
    .catch(error => {
        res.status(400).json("couldnt get the assign students");
        console.log(error);
    })

}

module.exports = {
    handleAssignGet
}