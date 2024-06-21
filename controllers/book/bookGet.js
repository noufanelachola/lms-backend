const handleBookGet = (req,res,db) => {
    const {schoolId,search} = req.query;

    let query = db.from("books")
    .select("*")
    .where({schoolid : schoolId})
    .orderBy("bookname");

    if(search){
        query = query.andWhere("bookname","ILIKE",`%${search}%`);
    }

    query.then(books => res.json(books))
    .catch(error => {
        res.status(400).json("Unable to books");
        console.log(error);
    })
}

module.exports = {
    handleBookGet
}