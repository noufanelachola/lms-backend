const handleRegister = (req,res,db) => {
    const {username,password,school_name} = req.body;
    const currentDate = new Date();
    const renewDate = new Date(currentDate.getFullYear()+1, currentDate.getMonth(), currentDate.getDate());
    const status = currentDate <= renewDate ? 1 : 0 ;

    db.transaction(trx => {
        trx.insert({
            username: username,
            password: password,
            school_name: school_name,
            start_date: currentDate, 
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