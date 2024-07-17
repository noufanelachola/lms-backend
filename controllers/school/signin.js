const handleSignIn = (req,res,db,bcrypt) => {
    const {username,password} = req.body;
    db.select(
        "id",
        "username",
        "password",
        "school_name",
        db.raw("TO_CHAR(start_date, 'DD-MM-YYYY') as start_date"),
        db.raw("TO_CHAR(end_date, 'DD-MM-YYYY') as end_date"),
        "is_active",
        db.raw("DATE_PART('day', AGE(end_date::date, start_date::date)) as date_left")
    )
    .from("school")
    .where("username",username)
    .then(school => {
        const access = bcrypt.compareSync(password,school[0].password);
        if(access){
            res.json(school[0]);
        } else {
            res.status(400).json("Wrong Credentials!!");
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json("Internal server error");
    }
    );
}

module.exports = {
    handleSignIn
}