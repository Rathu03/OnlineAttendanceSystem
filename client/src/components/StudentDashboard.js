import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentDashboard = () => {

  
  const rollnumber = localStorage.getItem('rollnumber');
  const [data,setData] = useState([])


  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('rollnumber');
    localStorage.removeItem('token');
    navigate('../')
  }

  useEffect(() => {
    const getData = async() => {
      const body = {rollnumber};
      const response = await fetch(`http://localhost:5000/student-get-data`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(body)
      })

      const temp = await response.json()
      setData(temp);
    }
    getData()
  },[rollnumber])

  return (
    <div className='main-body'>
      <div className='nav-container'>
        <h1>Student Dashboard</h1>
        <ul>
          <li onClick={handleClick}>Logout</li>
        </ul>
      </div>
      <div className='staff-dashboard'>
        <div className='staff-header'>
          <h1>Attendance List</h1>
        </div>
        <div style={{ borderTop: "1px solid white" }}></div>
        {data.length > 0 ? 
        <>
          { data.map((item,index) => (
          <div className='list-room' key={index} onClick={() => console.log(item)}>
          <div className='rooms'>
            <div className='room-header'>
              <div>{item.subject_code}</div>
              <div>{item.subject_name}</div>
            </div>
            <div className='room-header'>
              <div>Staff: {item.staff_name}</div>
              <div>Credits: {item.credit}</div>
            </div>
          </div> 
        </div>
        ))}
        </>: 
        <div style={{fontSize:"25px",padding:"30px"}}>
          No room found
        </div>
        }
        
        
      </div>
    </div>
  )
}

export default StudentDashboard