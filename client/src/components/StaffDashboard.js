import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('../')
  }

  const data = [
    {
    subject_code : "IT 5402",
    subject_name : "Data analytics and cloud computing",
    credits: 3,
    sem : 6
  },
  {
    subject_code : "IT 5402",
    subject_name : "Data analytics and cloud computing",
    credits: 3,
    sem : 6
  },
  {
    subject_code : "IT 5402",
    subject_name : "Data analytics and cloud computing",
    credits: 3,
    sem : 6
  },
  {
    subject_code : "IT 5402",
    subject_name : "Data analytics and cloud computing",
    credits: 3,
    sem : 6
  },
  {
    subject_code : "IT 5402",
    subject_name : "Data analytics and cloud computing",
    credits: 3,
    sem : 6
  } 
]

  return (
    <div className='main-body'>
      <div className='nav-container'>
        <h1>Staff Dashboard</h1>
        <ul>
          <li onClick={handleClick}>Logout</li>
        </ul>
      </div>
      <div className='staff-dashboard'>
        <div className='staff-header'>
          <h1>Attendance List</h1>
          <CiCirclePlus className='plus-icon' />
        </div>
        <div style={{ borderTop: "1px solid white" }}></div>
        {data.map((item,index) => (
          <div className='list-room' key={index}>
          <div className='rooms'>
            <div className='room-header'>
              <div>{item.subject_code}</div>
              <div>{item.subject_name}</div>
            </div>
            <div className='room-header'>
              <div>Sem: {item.sem}</div>
              <div>Credits: {item.credits}</div>
            </div>
          </div> 
        </div>
        ))}
        
      </div>
    </div>
  )
}

export default StaffDashboard