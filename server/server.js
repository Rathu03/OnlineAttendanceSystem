const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const body_parser = require("body-parser");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());
app.use(body_parser.urlencoded({extended:true}));

app.post('/registerstudent',async(req,res) => {

    const {rollnumber,username,password,email,year_of_joining} = req.body;

    const query = `INSERT INTO users VALUES($1,$2,$3,$4,$5);`;
    try{
        await pool.query(query,[rollnumber,username,password,email,year_of_joining]);
        res.status(201).json({message: "Student Registered Successfully"});
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

app.post('/loginstudent',async(req,res) => {
    const {rollnumber,password} = req.body;
    const query = `SELECT * from users WHERE rollnumber=$1 AND password=$2`;
    try{
        const result = await pool.query(query,[rollnumber,password]);
        if(result.rows.length > 0){
            console.log("Student Logged in: "+result.rows[0].username);
            res.status(200).json({message: 'Login Successful'});
        }
        else{
            res.status(401).json({message: 'Invalid credentials'});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
})

app.listen(5000,() => console.log("Server listening on port: 5000"));