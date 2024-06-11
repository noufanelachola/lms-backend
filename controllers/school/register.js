const handleRegister = (req,res,db,bcrypt) => {
    const {username,password,school_name} = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // Month is zero-based
    const day = currentDate.getDate();

    const currentDateOnly = new Date(year, month-1, day);
    const renewDate = new Date(year+1, month-1, day);
    const status = currentDate <= renewDate ? 1 : 0 ;

    db.transaction(trx => {
        trx.insert({
            username: username,
            password: hashedPassword,
            school_name: school_name,
            start_date: currentDateOnly, 
            end_date: renewDate,
            is_active: status
        })
        .into("school")
        .returning("*")
        .then(school => {
            res.json(school[0]);
            trx.commit();
        }).catch(error => {
            trx.rollback();
            res.status(400).json("Couldnt register your school");
            console.log(error);
        });
    });


    
}

module.exports = {
    handleRegister
}

// db("school").insert({
    //     username: username,
    //     password: password,
    //     school_name: school_name,
    //     start_date: currentDate, 
    //     end_date: renewDate,
    //     is_active: status
    // })
    //     .returning("*")
    //     .then(data => res.json(data[0]))
    //     .catch(err => res.status(400).json("unable to register")
    // );