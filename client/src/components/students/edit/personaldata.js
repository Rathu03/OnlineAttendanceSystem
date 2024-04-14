import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../Navbar';
import '../../CSS/edit.css'
function EditStudentPersonal() {
    const [studentData, setStudentData] = useState({
        RollNumber: '',
        DateOfBirth: '',
        Address: '',
        Phone: '',
        Sex: '',
        Blood_Group: '',
        FatherName: '',
        Mothername: '',
        Fatheroccupation: '',
        Motheroccupation: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const  [file,Setfile]=useState();
    const navigate = useNavigate(); 
var fetchedUsername;
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
   
                fetchedUsername = localStorage.getItem('rollnumber')
                const studentResponse = await axios.get(`http://localhost:5000/studentDetails/${fetchedUsername}`);
               

                if (studentResponse.data) {
                    const formattedStudentData = formatStudentData(studentResponse.data);
                    setStudentData(formattedStudentData);
              
                } else {
                    console.log("Student details not found");
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, []);

    const formatStudentData = (data) => {
        return {
            ...data,
            DateOfBirth: formatDate(data.DateOfBirth)
        };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prevData => ({
                ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (studentData.RollNumber) {
                const response = await axios.put(`http://localhost:5000/updateStudentDetails/${studentData.RollNumber}`, studentData);
                console.log('Student data updated successfully:', response.data);
                setSuccessMessage('Student data updated successfully');
            } else {
                const response = await axios.get('http://localhost:5000/session');
                fetchedUsername = response.data.username;
                const response1 = await axios.post(`http://localhost:5000/addStudentDetails/${fetchedUsername}`, studentData);
                console.log('Student data added successfully:', response1.data,fetchedUsername);
                setSuccessMessage('Student data added successfully');
            }

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/student/view/personaldata', { replace: true }); // Redirect to ViewPersonalData page
            }, 2000);
        } catch (error) {
            console.error('Error updating/adding student data:', error);
        }
    };
const handleFile=(e)=>{
    Setfile(e.target.files[0]);
}
const handleUpload=(e)=>{
const formdata=new FormData();
formdata.append('image',file);
axios.post(`http://localhost:5000/upload/${studentData.RollNumber}`,formdata)
.then(res=>{
    if(res.data.status === 'Success'){
        console.log("succeed");
    }
    else{
        console.log("failed");
    }

})
.catch(err=>console.log(err));
}
    return (
        <div>
            <Navbar />
            <div classname='edit-container'>
                <h1 className='form-heading'>Edit Personal Details</h1>
                <form className='edit-form' onSubmit={handleSubmit}>
                    <div className='form-master'>
                        <div className='form-fragment-left'>
                            <div className='img-container'>
                                <img className='prof-pic' width='300px' src={`http://localhost:5000/getImage/${studentData.RollNumber}`} alt='img'/>
                            </div>
                            <br/>
                            <label className="custom-file-upload">
                                <input type="file" onChange={handleFile} />
                                Change Photo
                            </label>

                            <br/>
                            <button  onClick={handleUpload}>Upload</button>
                        </div>
                        <div className='form-fragment-right'>


                            <table>
                                <tr>
                                    <td><label className='edit-label'>Date of Birth:</label>
                                        <input className='edit-input' type="date" name="DateOfBirth" placeholder='Data of Birth' value={studentData.DateOfBirth || ""} onChange={handleChange} />
                                    </td>
                                    <td>
                                        <label className='edit-label'>Phone:</label>
                                        <input className='edit-input' type="text" name="Phone" placeholder='Mobile Number' value={studentData.Phone} onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className='edit-label'>Sex:</label>
                                        <select className='edit-dropdown' name="Sex" value={studentData.Sex} onChange={handleChange}>
                                        <option value="" disabled selected>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </td>
                                    <td>
                                        <label className='edit-label'>Blood Group:</label>
                                        <select className='edit-dropdown' name="Blood_Group" value={studentData.Blood_Group} onChange={handleChange}>
                                            <option value="" disabled selected>Blood Group</option>
                                            <option value="O+">O+</option>
                                            <option value="A+">A+</option>
                                            <option value="B+">B+</option>
                                            <option value="O-">O-</option>
                                            <option value="A-">A-</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='full-width' colSpan={'2'}>
                                        <label className='edit-label'>Address:</label>
                                        <input  className='edit-input' id='full-width-input' type="text" name="Address" placeholder='Address' value={studentData.Address} onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className='edit-label'>Father's Name:</label>
                                         <input  className='edit-input' type="text" name="FatherName" placeholder='Father Name' value={studentData.FatherName} onChange={handleChange} />
                                    </td>
                                    <td>
                                    <label className='edit-label'>Father's Occupation:</label>
                                         <input className='edit-input' type="text" name="Fatheroccupation" placeholder='Father Occupation' value={studentData.Fatheroccupation} onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className='edit-label'>Mother's Name:</label>
                                        <input className='edit-input' type="text" name="Mothername" placeholder='Mother Name' value={studentData.Mothername} onChange={handleChange} />
                                    </td>
                                    <td>
                                        <label className='edit-label'>Mother's Occupation:</label>
                                        <input className='edit-input' type="text" name="Motheroccupation" placeholder='Mother Occupation' value={studentData.Motheroccupation} onChange={handleChange} />
                                    </td>
                                </tr>
                            </table>

{/* 

                            <label className='edit-label'>Date of Birth:</label>
                            <input className='edit-input' type="date" name="DateOfBirth" placeholder='Data of Birth' value={studentData.DateOfBirth || ""} onChange={handleChange} />
                    
                        
                            
                    
                            <label className='edit-label'>Phone:</label>
                            <input className='edit-input' type="text" name="Phone" placeholder='Mobile Number' value={studentData.Phone} onChange={handleChange} />
                    
                            <label className='edit-label'>Sex:</label>
                            <select className='edit-dropdown' name="Sex" value={studentData.Sex} onChange={handleChange}>
                            <option value="" disabled selected>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                    
                    
                            <label className='edit-label'>Blood Group:</label>
                            <select className='edit-dropdown' name="Blood_Group" value={studentData.Blood_Group} onChange={handleChange}>
                                <option value="" disabled selected>Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                    
                        
                            <label className='edit-label'>Father's Name:</label>
                            <input  className='edit-input' type="text" name="FatherName" placeholder='Father Name' value={studentData.FatherName} onChange={handleChange} />
                    
                        
                            <label className='edit-label'>Mother's Name:</label>
                            <input className='edit-input' type="text" name="Mothername" placeholder='Mother Name' value={studentData.Mothername} onChange={handleChange} />
                        
                        
                            <label className='edit-label'>Father's Occupation:</label>
                            <input className='edit-input' type="text" name="Fatheroccupation" placeholder='Father Occupation' value={studentData.Fatheroccupation} onChange={handleChange} />
                    
                        
                            <label className='edit-label'>Mother's Occupation:</label>
                            <input className='edit-input' type="text" name="Motheroccupation" placeholder='Mother Occupation' value={studentData.Motheroccupation} onChange={handleChange} />
                            <br/> */}

                            <br/><button type="submit" >Submit</button>

                        </div>
                    </div>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </div>
    );
}

export default EditStudentPersonal;
