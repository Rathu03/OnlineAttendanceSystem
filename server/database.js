const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password:"root",
    host:"localhost",
    port:5432,
    database:"online_attendance_system"
});


module.exports = pool