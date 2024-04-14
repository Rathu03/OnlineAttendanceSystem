import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin-get-students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-body">
      <Navbar />
      <div className="admin-dashboard">
        <h1>Student Attendance Data</h1>
        <div className="student-list">
          {students.map((student) => (
            <div key={student.rollnumber} className="student">
              <div>{student.rollnumber}</div>
              <div>{student.name}</div>
              <div>{student.attendancePercentage}</div>
              <button onClick={() => navigate(`/admin/edit/${student.rollnumber}`)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
