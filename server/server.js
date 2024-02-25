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
        res.status(201).json({ message: "Student Registered Successfully" });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
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

app.listen(5000, () => console.log("Server listening on port: 5000"));