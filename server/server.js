const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const body_parser = require("body-parser");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());
app.use(body_parser.urlencoded({ extended: true }));


app.post('/tokencheck', async (req, res) => {
    const { token } = req.body;
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.error('Failed to verify token: ', err.message);
            res.status(401).json({ success: false, decoded });
        }
        else {
            console.log('Decoded token: ', decoded);
            res.status(201).json({ success: true, decoded });
        }
    })
})

app.post('/registerstudent', async (req, res) => {

    const { rollnumber, username, password, email, year_of_joining } = req.body;

    const query = `INSERT INTO users VALUES($1,$2,$3,$4,$5);`;
    try {
        await pool.query(query, [rollnumber, username, password, email, year_of_joining]);
        res.status(201).json({ success: 1 });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: 0 });
    }
})

app.post('/loginstudent', async (req, res) => {
    const { rollnumber, password } = req.body;
    const query = `SELECT * from users WHERE rollnumber=$1 AND password=$2`;
    try {
        const result = await pool.query(query, [rollnumber, password]);
        if (result.rows.length > 0) {
            console.log("Student Logged in: " + result.rows[0].username);
            const token = jwt.sign({
                rollnumber,
                type: "student"
            }, "secret", {
                expiresIn: 60 * 60
            })
            res.status(200).json({ success: true, token });
        }
        else {
            res.status(401).json({ success: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/registerstaff', async (req, res) => {
    const { teacher_name, password, email } = req.body;
    const query = `INSERT INTO teachers(teacher_name,password,email) VALUES($1,$2,$3)`;
    try {
        await pool.query(query, [teacher_name, password, email])
        res.status(201).json({ success: 1 })
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ success: 0 })
    }
})

app.post('/loginstaff', async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * from teachers WHERE email=$1 AND password=$2`;
    try {
        const result = await pool.query(query, [email, password]);
        console.log(result.rows.length)
        if (result.rows.length > 0) {
            console.log("Staff Logged in: " + result.rows[0].email);

            const token = jwt.sign({
                email,
                type: "staff"
            }, "secret", {
                expiresIn: 60 * 60
            })
            res.status(201).json({ success: true, token })
        }
        else {
            res.status(401).json({ success: false })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ success: "Internal Server Error" })
    }
})


app.post('/create-room', async (req, res) => {
    const body = req.body;
    console.log("hi")
    const query = `INSERT INTO enrolledsubjects(student_roll_number,subject_code,teacher_email) VALUES($1,$2,$3)`;
    try {
        for (const obj of body) {
            console.log("hello")
            await pool.query(query, [obj.rollnumber, obj.subject_code, obj.teacher_email])
        }
        res.status(201).json({ success: "Enrolled successdully" })
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ success: "Failed to enroll" })
    }
})

app.post('/get-data', async (req, res) => {
    const { rollnumber } = req.body;
    const query1 = `SELECT teacher_email,subject_code from enrolledsubjects WHERE student_roll_number = $1`;
    const query2 = `SELECT subject_name,credits from subjects WHERE subject_code = $1`;
    const query3 = `SELECT teacher_name from teachers WHERE email = $1`
    try {
        const result1 = await pool.query(query1, [rollnumber]);
        const data = []
        for (const row of result1.rows) {
            const staff_email = row.teacher_email;
            const subject_code = row.subject_code;

            const result2 = await pool.query(query2, [subject_code]);
            const subject_name = result2.rows[0].subject_name;
            const credit = result2.rows[0].credits

            const result3 = await pool.query(query3, [staff_email]);
            const staff_name = result3.rows[0].teacher_name;
            
            data.push({staff_name,subject_code,subject_name,credit});
        }
        //console.log(data);
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err)
        res.status(401).json({error:"Failed to fetch data"})
    }
})

app.listen(5000, () => console.log("Server listening on port: 5000"));