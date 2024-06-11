const handleSignIn = (req,res,db,bcrypt) => {
    const {username,password} = req.body;
    db.select("*")
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