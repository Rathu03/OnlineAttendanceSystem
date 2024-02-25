-- Registration for Students and Staffs
CREATE TABLE users (
    rollnumber INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    year_of_joining INT NOT NULL
);

-- Subject details
CREATE TABLE subjects (
    subject_code VARCHAR(50) PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    credits INT NOT NULL
);

--Subject details with respect to Sem
CREATE TABLE sem (
    subject_code VARCHAR(50) PRIMARY KEY REFERENCES subjects(subject_code),
    sem_number INT NOT NULL
);

--Teachers table 
CREATE TABLE teachers (
    teacherId SERIAL PRIMARY KEY,
    teacher_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

--Relation between Students and Teachers
CREATE TABLE enrolledsubjects (
    student_roll_number INT,
    subject_code VARCHAR(50),
    attendance INT DEFAULT 0,
    teacherId INT,
    PRIMARY KEY (student_roll_number, subject_code),
    FOREIGN KEY (subject_code) REFERENCES subjects(subject_code),
    FOREIGN KEY (teacherId) REFERENCES teachers(teacherId)
);