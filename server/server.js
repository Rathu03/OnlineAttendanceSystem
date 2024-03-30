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
    const query1 = `INSERT INTO enrolledsubjects(student_roll_number,subject_code,teacher_email) VALUES($1,$2,$3)`;
    const query2 = `INSERT INTO sem values($1,$2)`;
    try {
        for (const obj of body) {
            await pool.query(query1, [obj.rollnumber, obj.subject_code, obj.teacher_email])
        }

        const sem_number = body[0].sem_number;
        const subject_code = body[0].subject_code;
        await pool.query(query2,[subject_code,sem_number]);

        res.status(201).json({ success: "Enrolled successdully" })
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ success: "Failed to enroll" })
    }
})

app.post('/student-get-data', async (req, res) => {
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
        
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err)
        res.status(401).json({error:"Failed to fetch data"})
    }
})

app.post('/staff-get-data',async(req,res) => {
    const {email} = req.body;
    const query1 = `SELECT DISTINCT subject_code from enrolledsubjects WHERE teacher_email = $1`;
    const query2 = `SELECT subject_name,credits from subjects WHERE subject_code = $1`;
    const query3 = `SELECT sem_number from sem WHERE subject_code = $1`;
    try{
        const result1 = await pool.query(query1,[email]);
        const data = []
        for(const row of result1.rows){
            const subject_code = row.subject_code;
            
            const result2 = await pool.query(query2,[subject_code]);
            const subject_name = result2.rows[0].subject_name;
            const credits = result2.rows[0].credits;
            
            const result3 = await pool.query(query3,[subject_code]);
            const sem = result3.rows[0].sem_number; 

            data.push({subject_code,subject_name,credits,sem})
        }

        res.status(201).json(data);
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Failed to fetch data"});
    }
})

app.post('/student-room',async(req,res) => {
    const {staff_name,subject_code,subject_name,credit,rollnumber} = req.body;
    const query = `SELECT class_attended,class_taken FROM enrolledsubjects WHERE student_roll_number = $1 AND subject_code = $2`;
    try{
        const result = await pool.query(query,[rollnumber,subject_code]);
        const class_attended = result.rows[0].class_attended;
        const class_taken = result.rows[0].class_taken;
        res.status(201).json({staff_name,subject_code,subject_name,credit,rollnumber,class_taken,class_attended});
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Failed to fetch"})
    }
})

app.post('/get-staff-data',async(req,res) => {
    const {subject_code,subject_name,credits,email} = req.body;
    const query1 = `SELECT student_roll_number from enrolledsubjects WHERE subject_code = $1 AND teacher_email = $2`;
    const query2 = `SELECT username from users WHERE rollnumber = $1`;
    const query3 = `SELECT class_attended,class_taken FROM enrolledsubjects WHERE student_roll_number = $1 AND subject_code = $2`;
    const data = []
    try{
        const result1 = await pool.query(query1,[subject_code,email]);
        for(const obj of result1.rows ){
            const rollnumber = obj.student_roll_number;
            
            const result2 = await pool.query(query2,[rollnumber]);
            const student_name = result2.rows[0].username;
            
            const result3 = await pool.query(query3,[rollnumber,subject_code]);
            const class_attended = result3.rows[0].class_attended;
            const class_taken = result3.rows[0].class_taken; 

            data.push({subject_code,subject_name,credits,email,rollnumber,student_name,class_attended,class_taken});
        }
        res.status(201).json(data);
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Failed to fetch"})
    }
})

app.post('/attendance',async(req,res) => {
    const {selectedStudentsData,notSelectedStudentsData,numofhours} = req.body;
    const query1 = `SELECT class_taken,class_attended from enrolledsubjects WHERE student_roll_number = $1 AND subject_code = $2`;
    const query2 = `UPDATE enrolledsubjects SET class_taken = $1, class_attended = $2 WHERE student_roll_number = $3 AND subject_code = $4`;
    try{
        for(const obj of selectedStudentsData) {
            const result1 = await pool.query(query1,[obj.rollnumber,obj.subject_code]);
            
            const class_taken = result1.rows[0].class_taken;
            const class_attended = result1.rows[0].class_attended;

            await pool.query(query2,[parseInt(class_taken)+parseInt(numofhours),parseInt(class_attended)+parseInt(numofhours),obj.rollnumber,obj.subject_code]);
        }
        for(const obj of notSelectedStudentsData) {
            const result1 = await pool.query(query1,[obj.rollnumber,obj.subject_code]);
            
            const class_taken = result1.rows[0].class_taken;
            const class_attended = result1.rows[0].class_attended;
            console.log(parseInt(class_taken)+parseInt(numofhours))
            await pool.query(query2,[parseInt(class_taken)+parseInt(numofhours),parseInt(class_attended),obj.rollnumber,obj.subject_code]);
        }
        res.status(201).json({success: "1"})
    }
    catch(err){
        console.log(err);
        res.status(401).json({success: "0"})
    }
})

app.post('/attendance1',async(req,res) => {
    const {presentStudentData,absentStudentData,numofhours} = req.body;
    const query1 = `SELECT class_taken,class_attended from enrolledsubjects WHERE student_roll_number = $1 AND subject_code = $2`;
    const query2 = `UPDATE enrolledsubjects SET class_taken = $1, class_attended = $2 WHERE student_roll_number = $3 AND subject_code = $4`;
    try{
        for(const obj of presentStudentData) {
            const result1 = await pool.query(query1,[obj.rollnumber,obj.subject_code]);
            
            const class_taken = result1.rows[0].class_taken;
            const class_attended = result1.rows[0].class_attended;

            await pool.query(query2,[parseInt(class_taken)+parseInt(numofhours),parseInt(class_attended)+parseInt(numofhours),obj.rollnumber,obj.subject_code]);
        }
        for(const obj of absentStudentData) {
            const result1 = await pool.query(query1,[obj.rollnumber,obj.subject_code]);
            
            const class_taken = result1.rows[0].class_taken;
            const class_attended = result1.rows[0].class_attended;
            console.log(parseInt(class_taken)+parseInt(numofhours))
            await pool.query(query2,[parseInt(class_taken)+parseInt(numofhours),parseInt(class_attended),obj.rollnumber,obj.subject_code]);
        }
        res.status(201).json({success: "1"})
    }
    catch(err){
        console.log(err);
        res.status(401).json({success: "0"})
    }
})

app.post('/attendance-view',async(req,res) => {
    const {subject_code,email} = req.body;
    const query1 = `SELECT class_taken from enrolledsubjects WHERE subject_code = $1 AND teacher_email = $2`;
    try{
        const result = await pool.query(query1,[subject_code,email]);
        const class_taken = result.rows[0];
        res.status(201).json({class_taken:class_taken})
    }
    catch(err){
        res.status(401).json({message:"Error in viewing"})
    }
})

app.post('/search/:id',async(req,res) => {
    const {email,subjectcode} = req.body;
    const query1 = `SELECT username,rollnumber from users WHERE rollnumber::text LIKE $1 AND rollnumber in (SELECT student_roll_number from enrolledsubjects WHERE teacher_email=$2 AND subject_code=$3)`;
    const query2 = `SELECT class_taken,class_attended from enrolledsubjects WHERE student_roll_number = $1 AND teacher_email = $2 AND subject_code = $3`;
    const data = []
    try{
        const roll = req.params.id;
        var rtemp = "%";
        rtemp+=roll;
        rtemp+="%";
        console.log(rtemp)
        const result1 = await pool.query(query1,[rtemp,email,subjectcode]);
        console.log(result1.rows)
        
        var t=0;

        for(const obj of result1.rows){
            t=1;
            const student_name = obj.username;
            const rollnumber = obj.rollnumber;
            const result2 = await pool.query(query2,[rollnumber,email,subjectcode]);
            const class_taken = result2.rows[0].class_taken
            const class_attended = result2.rows[0].class_attended

            data.push({rollnumber,student_name,subjectcode,email,class_taken,class_attended});
        }

        if(t==1){
            res.status(201).json(data);
        }
        else{
            res.status(201).json([]);
        }
        
    }
    catch(err){
        res.status(401).json({message:"Internal server error"})
    }
})

app.listen(5000, () => console.log("Server listening on port: 5000"));