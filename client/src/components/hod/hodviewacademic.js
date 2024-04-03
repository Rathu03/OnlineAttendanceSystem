import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Navbarfun from '../usercomponents/Navbarfun'
function Hodviewacademic(){
    const userRef = useRef(null);
    const [rollNumber, setRollNumber] = useState('');
    const cursemRef= useRef(null);
    const  [basicacademic,setbasicacademic]=useState(null);
    const [marks, setMarks] = useState(null);
    const  [sem,setsem]=useState(null);
    const [gpa,setgpa]=useState(null);
    const [verifiedstatus,setverifiedstatus]=useState(false);
    const handleInputChangesem = (event) => {
        setsem(event.target.value);
       
    };
    const handleInputChange = (event) => {
        setRollNumber(event.target.value);
    };
    const fetchdata = () => {
        axios.get(`http://localhost:5000/basicacademic/${rollNumber}`)
        .then(response => {
            if (response.data) {
                setbasicacademic(response.data);
                cursemRef.current = response.data.CurrentSemester;
            } else {
               alert('no academic found');
            }
        })
        .catch(error => {
            console.log(error);
        })
        axios.get(`http://localhost:5000/getsemestermarks/${rollNumber}/${sem}`)
        .then(response => {
            if(response.data){
                setMarks(response.data);
            }
            else{
                alert('no marks found');
            }
        })
        .catch(err => {
            console.log(err);
        })
       axios.get(`http://localhost:5000/getsemestergpa/${rollNumber}/${sem}`)
       .then(response => {
    
        setgpa(response.data);
       })
       .catch(err => {
        console.log(err);
        })

       axios.get(`http://localhost:5000/getverifystatus/${rollNumber}/${sem}`)
       .then(response => {
        if(response.data.allVerified==1){
            setverifiedstatus(true);
        }
        else{
            setverifiedstatus(false);
        }
       
       })
       .catch(err => {
        console.log(err);
        })
        
    }

    useEffect(() => {
        axios.get('http://localhost:5000/session')
        .then(response => {
            userRef.current = rollNumber;
            if(rollNumber){
            fetchdata();
        }

        })
        .catch(error => {
            console.log(error);
        })
        
    },[sem])
   
    const Approve=() => {
        axios.get(`http://localhost:5000/approve/${rollNumber}/${sem}`)
        .then(response => {
            setverifiedstatus(true);
            alert("Marks are approved")
        })
        .catch(error => {
            console.log(error);
        })
    }
    const unApprove=()=>{
        axios.get(`http://localhost:5000/unapprove/${rollNumber}/${sem}`)
        .then(response => {
            setverifiedstatus(false);
            alert("Marks are unapproved")
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <>
        <Navbarfun/>
     
        <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange}
            />
            <button className='add-btn' onClick={fetchdata}>Search</button>
        {basicacademic &&<div className='basic-detail'>
            <p><strong>Current Semester : </strong>{basicacademic.CurrentSemester}</p>
            <p><strong>Tenth Marks : </strong>{basicacademic.TenthMarks}</p>
            <p><strong>Higher Secondary Marks : </strong>{basicacademic.HigherSecondaryMarks}</p>
            </div>}
            <div>
            <label htmlFor="semSelect">Select Semester:</label>
            <select
                id="semSelect"
                value={sem || ''}
                onChange={handleInputChangesem}
            >
                <option value="">Select Semester</option>
                {[...Array(8).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
            </select>
          
        </div>
        { marks && verifiedstatus && <div>
            <button className='delete-btn'onClick={unApprove}>Unapprove</button>
            <p>Marks are verified</p>
            </div>}

            {marks && !verifiedstatus && <div>
                <button className='add-btn'onClick={Approve}>Approve</button>
                <p>Marks are not verified</p>
                </div>}
        {marks &&  <div>
      <center><h2>Marks Table</h2></center>
      <table className='marks-table'>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark, index) => (
            <tr key={index}>
              <td>{mark.SubjectID}</td>
              <td>{mark.MarksObtained}</td>
              <td>{mark.Grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {gpa && <p className='gpa-show'>Semester GPA:{gpa.gpa}</p>}
    </div>}
        </>
    )
}
export default Hodviewacademic;