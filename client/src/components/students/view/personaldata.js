import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import styles from '../../CSS/view.css';
function ViewStudentPersonal() {
    const [studentDetails, setStudentDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentImage, setStudentImage] = useState('');
    const [error, setError] = useState('');
    axios.defaults.withCredentials = true; 
    useEffect(() => {
       
                const username = localStorage.getItem('rollnumber')
                
                axios.get(`http://localhost:5000/studentDetails/${username}`)
                    .then(response => {
                        if (response.data) {
                           
                            const formattedStudentDetails = {
                                ...response.data,
                                DateOfBirth: formatDate(response.data.DateOfBirth)
                            };
                            console.log(formattedStudentDetails);
                            var RollNumber=formattedStudentDetails.RollNumber;
                            setStudentDetails(formattedStudentDetails);
                        } else {
                            setErrorMessage('No student details available');
                        }
                        console.log(RollNumber);
                    })
                    .catch(error => {
                        console.error('Error fetching student details:', error);
                    });
          
              
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Navbar />
            <div id='student-view-personal'>
            <div className='view-container'>
                <h1 className='view-heading'>Student Personal Details</h1>
                <br/>
                {errorMessage && <p>{errorMessage}</p>}
                {studentDetails && (
                    <>
                    <center>
                   <img className='prof-pic' width={'300px'} src={`http://localhost:5000/getImage/${studentDetails.RollNumber}`} alt='img'/>
                   </center>
                   <center>
                    <div className='view-form'>
                        
                       <table border={'0'}> 
                            {/* <tr>
                                <td className='topic'><p className='view-field'><strong>Roll Number:</strong></p></td>
                                <td><p>{studentDetails.RollNumber}</p></td>

                                <td colSpan={'2'} id='name-td'>
                                    <p className='view-field' id='name'><strong></strong> {studentDetails.Name}</p>
                                </td>

                                <td className='topic'><p className='view-field'><strong>Phone:</strong></p></td>
                                <td><p>{studentDetails.Phone}</p></td>
                            </tr>

                            <tr>
                                <td className='topic'><p className='view-field'><strong>Gender:</strong></p></td>
                                <td><p>{studentDetails.Sex}</p></td>
                                <td></td>
                                <td></td>

                                <td className='topic'><p className='view-field'><strong>Blood Group:</strong></p></td>
                                <td><p>{studentDetails.Blood_Group}</p></td>
                            </tr>

                            <tr>
                                <td className='topic'><p className='view-field'><strong>DOB:</strong></p></td>
                                <td><p>{studentDetails.DateOfBirth}</p></td>
                                
                                <td className='topic'><p className='view-field'><strong>Address:</strong></p></td>
                                <td><p>{studentDetails.Address}</p></td>

                                <td className='topic'><p className='view-field'><strong>Resident type:</strong></p></td>
                                <td><p>{studentDetails.Residenttype}</p></td>
                            </tr>
                            <tr>
                                <td className='topic'><p className='view-field'><strong>Father's Name:</strong></p></td>
                                <td><p>{studentDetails.FatherName}</p></td>
                                
                                <td className='topic'><p className='view-field'><strong>Father's Occupation:</strong></p></td>
                                <td><p>{studentDetails.Fatheroccupation}</p></td>

                                <td className='topic'><p className='view-field'><strong>Father's Mobile:</strong></p></td>
                                <td><p>{studentDetails.Fathermobile}</p></td>
                            </tr>
                            <tr>
                                <td className='topic'><p className='view-field'><strong>Mother's Name:</strong></p></td>
                                <td><p>{studentDetails.Mothername}</p></td>
                                
                                <td className='topic'><p className='view-field'><strong>Mother's Occupation:</strong></p></td>
                                <td><p>{studentDetails.Motheroccupation}</p></td>

                                <td className='topic'><p className='view-field'><strong>Mother's Mobile:</strong></p></td>
                                <td><p>{studentDetails.Mothermobile}</p></td>
                            </tr> */}



                            <tr>
                                <td>
                                    <p className='view-field'><strong>Roll Number:</strong><br/> {studentDetails.RollNumber}</p>
                                </td>

                                <td colSpan={'2'} id='image-td'>
                                    <p className='view-field' id='name'><strong></strong><br/> {studentDetails.Name}</p>
                                </td>

                                <td>
                                    <p className='view-field'><strong>Phone:</strong><br/> {studentDetails.Phone}</p>
                                </td>
                            </tr>
                            <tr>
                                <td ><p className='view-field'><strong>Gender:</strong><br/> {studentDetails.Sex}</p></td>
                                <td></td>
                                <td></td>
                                <td ><p className='view-field'><strong>Blood Group:</strong><br/> {studentDetails.Blood_Group}</p></td>
                            </tr>
                            <tr>
                                <td>
                                <p className='view-field'><strong>DOB:</strong><br/> {studentDetails.DateOfBirth}</p>
                                    </td>
                                
                                <td colSpan={'2'}>
                                <p className='view-field'><strong>Address:</strong><br/> {studentDetails.Address}</p>
                                </td>
                                <td><p className='view-field'><strong>Resident Type</strong><br/> {studentDetails.Residenttype}</p></td>

                            </tr>
                            <tr>
                                <td ><p className='view-field'><strong>Father's Name:</strong><br/> {studentDetails.FatherName}</p></td>
                                <td colSpan={'2'}><p className='view-field'><strong>Father's Occupation:</strong><br/> {studentDetails.Fatheroccupation}</p></td>
                                <td ><p className='view-field'><strong>Father's Mobile:</strong><br/> {studentDetails.Fathermobile}</p></td>
                            </tr>
                            <tr>
                                <td ><p className='view-field'><strong>Mother's Name:</strong><br/> {studentDetails.Mothername}</p></td>
                                <td colSpan={'2'}><p className='view-field'><strong>Mother's Occupation:</strong><br/> {studentDetails.Motheroccupation}</p></td>
                                <td ><p className='view-field'><strong>Mother's Mobile:</strong> <br/>{studentDetails.Mothermobile}</p></td>
                            </tr>
                            

                        </table>


{/* 
                        
                        <p className='view-field'><strong>Roll Number:</strong> {studentDetails.RollNumber}</p>
                        <p className='view-field'><strong>Date of Birth:</strong> {studentDetails.DateOfBirth}</p>
                        <center>
                        <p>
                        <img className='prof-pic' width={'300px'} src={`http://localhost:5000/getImage/${studentDetails.RollNumber}`} alt='img'/>
                        </p>
                    </center>
                        <p className='view-field'><strong>Address:</strong> {studentDetails.Address}</p>
                        <p className='view-field'><strong>Phone:</strong> {studentDetails.Phone}</p>
                     
                        <p className='view-field'><strong>Sex:</strong> {studentDetails.Sex}</p>
                        <p className='view-field'><strong>Blood Group:</strong> {studentDetails.Blood_Group}</p>
                        <p className='view-field'><strong>Father's Name:</strong> {studentDetails.FatherName}</p>
                        <p className='view-field'><strong>Mother's Name:</strong> {studentDetails.Mothername}</p>
                        <p className='view-field'><strong>Father's Occupation:</strong> {studentDetails.Fatheroccupation}</p>
                        <p className='view-field'><strong>Mother's Occupation:</strong> {studentDetails.Motheroccupation}</p>


                         */}
                    </div>
                    </center>
                    </>
                )}
            </div>
            </div>
        </>
    );
}

export default ViewStudentPersonal;