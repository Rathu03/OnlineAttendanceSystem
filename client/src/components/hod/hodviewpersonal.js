import React, { useState } from 'react';
import axios from 'axios';
import Navbarfun from '../usercomponents/Navbarfun'
function Hodviewpersonal(){
    const [rollNumber, setRollNumber] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };

    const fetchStudentDetails = () => {
        axios.get(`http://localhost:5000/studentDetails/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    const formattedStudentDetails = {
                        ...response.data,
                        DateOfBirth: formatDate(response.data.DateOfBirth)
                    };
                    setStudentDetails(formattedStudentDetails);
                    setErrorMessage('');
                } else {
                    setStudentDetails(null);
                    setErrorMessage('No student details available');
                }
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className='staffviewpersonal'>
            <Navbarfun />
           
            <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button className='add-btn' onClick={fetchStudentDetails}>Search</button>
            {errorMessage && <p>{errorMessage}</p>}
            {studentDetails && (
                <div className='teacheracademiccont'>
                    <p className='teacher-view-field'><strong>Roll Number:</strong> {studentDetails.RollNumber}</p>
                    <p className='teacher-view-field'><strong>Date of Birth:</strong> {studentDetails.DateOfBirth}</p>
                    <p className='teacher-view-field'><strong>Address:</strong> {studentDetails.Address}</p>
                    <p className='teacher-view-field'><strong>Phone:</strong> {studentDetails.Phone}</p>
                    <p className='teacher-view-field'><strong>Sex:</strong> {studentDetails.Sex}</p>
                    <p className='teacher-view-field'><strong>Blood Group:</strong> {studentDetails.Blood_Group}</p>
                    <p className='teacher-view-field'><strong>Father's Name:</strong> {studentDetails.FatherName}</p>
                    <p className='teacher-view-field'><strong>Mother's Name:</strong> {studentDetails.Mothername}</p>
                    <p className='teacher-view-field'><strong>Father's Occupation:</strong> {studentDetails.Fatheroccupation}</p>
                    <p className='teacher-view-field'><strong>Mother's Occupation:</strong> {studentDetails.Motheroccupation}</p>
                </div>
            )}
        </div>
    );
}
export default Hodviewpersonal;