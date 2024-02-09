const express = require("express");
const app = express();
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const register = require("./routes/register");

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
    db.select("*").from("school").then(data => res.json(data))
        .catch(err => res.status(400).json("error"));
})

app.post("/school/register",(req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.listen(3000,() => {
    console.log(`App is running on port 3000`);
});
