import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react';


const AttendanceView = () => {
  const navigate = useNavigate();

  const [roomdata,setRoomdata] = useState({})

  const handleClick = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('../../')
  }

  useEffect(() => {
    const handleRoomdata = async() => {
      
    }
  })

  return (
    <div className='main-body'>
        <div className='nav-container'>
            <h1>View Attendance</h1>
            <ul>
                <li onClick={handleClick}>Logout</li>
            </ul>
        </div>
        <div className='room-data-container'>
          <div className='room-data'>
            <div style={{width:"30%"}}>Subject code: </div>
          </div>
        </div>
    </div>
  )
}

export default AttendanceView