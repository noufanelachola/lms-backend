const handleSignIn = (req,res,db,bcrypt) => {
    const {username,password} = req.body;
    db.select("password")
        .from("school")
        .where("username",username)
        .then(school => {
            const access = bcrypt.compareSync(password,school[0].password);
            if(access){
                res.json("Signed in successfully")
            } else {
                res.status(400).json("Sign in failed!!")
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("error")
        }
    );
}

module.exports = {
    handleSignIn
}