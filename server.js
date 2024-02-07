const express = require("express");
const app = express();
const knex = require("knex");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : '9987',
        database : 'lms'
    }
})


app.get("/",(req,res) => {
    db.select("*").from("school").then(data => res.json(data[0]))
        .catch(err => res.status(400).json("error"));
})

app.post("/school/register",(req,res) => {
    const {username,password,school_name} = req.body;
    const currentDate = new Date();
    const renewDate = new Date(currentDate.getFullYear()+1, currentDate.getMonth(), currentDate.getDate());
    const status = currentDate <= renewDate ? 1 : 0 ;

    db("school").insert({
        username: username,
        password: password,
        school_name: school_name,
        start_date: currentDate, 
        end_date: renewDate,
        is_active: status
    })
        .returning("*")
        .then(data => res.json(data[0]))
        .catch(err => res.status(400).json("unable to register"));
});

app.listen(3000,() => {
    console.log(`App is running on port 3000`);
});
