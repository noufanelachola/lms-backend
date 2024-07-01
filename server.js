const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/school/register");
const signin = require("./controllers/school/signin");
const studentAdd = require("./controllers/student/studentAdd");
const studentCount = require("./controllers/student/studentCount");
const studentWithBooksCount = require("./controllers/student/studentWithBooksCount");
const studentGet = require("./controllers/student/studentGet");
const studentDelete = require("./controllers/student/studentDelete");
const bookAdd = require("./controllers/book/bookAdd");
const bookTotalCount = require("./controllers/book/bookTotalCount");
const bookStockCount = require("./controllers/book/bookStockCount");
const bookGet = require("./controllers/book/bookGet");
const assign = require("./controllers/assign/assign");
const assignGet = require("./controllers/assign/assignGet");
const assignSubmit = require("./controllers/assign/assignSubmit");

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
    db.select("*").from("school")
    .then(data => res.json(data))
    .catch(err => res.status(400).json("error"));
});

// route to register schools by admin
app.post("/school/register",(req,res) => {register.handleRegister(req,res,db,bcrypt)});

// route to signin by users
app.post("/school/signin",(req,res) => {signin.handleSignIn(req,res,db,bcrypt)});

// route to add students
app.post("/student/add",(req,res) => {studentAdd.handleStudentAdd(req,res,db)});
app.get("/student/count", (req,res) => {studentCount.handleStudentCount(req,res,db)});
app.get("/student/withbookscount", (req,res) => {studentWithBooksCount.handleStudentWithBooksCount(req,res,db)});
app.get("/student/get", (req,res) => {studentGet.handleStudentGet(req,res,db)});
app.delete("/student/delete", (req,res) => {studentDelete.handleStudentDelete(req,res,db)});

// route to add books
app.post("/book/add",(req,res) => {bookAdd.handleBookAdd(req,res,db)});
app.get("/book/totalcount",(req,res) => {bookTotalCount.handleBookTotalCount(req,res,db)});
app.get("/book/stockcount",(req,res) => {bookStockCount.handleBookStockCount(req,res,db)});
app.get("/book/get",(req,res) => {bookGet.handleBookGet(req,res,db)});


// route to assign
app.post("/assign",(req,res) => {assign.assign(req,res,db)});
app.get("/assign/get",(req,res) => {assignGet.handleAssignGet(req,res,db)});
app.put("/assign/submit",(req,res) => {assignSubmit.handleAssignSubmit(req,res,db)});

app.listen(3000,() => {
    console.log(`App is running on port 3000`);
});
