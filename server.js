const express = require("express");
const app = express();
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/school/register");
const signin = require("./controllers/school/signin");
const studentAdd = require("./controllers/student/studentAdd");

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

// route to register schools by admin
app.post("/school/register",(req,res) => {register.handleRegister(req,res,db,bcrypt)});
// route to signin by users
app.post("/school/signin",(req,res) => {signin.handleSignIn(req,res,db,bcrypt)});

// route to add students
app.post("/student/add",(req,res) => {studentAdd.handleStudentAdd(req,res,db)});

app.listen(3000,() => {
    console.log(`App is running on port 3000`);
});
