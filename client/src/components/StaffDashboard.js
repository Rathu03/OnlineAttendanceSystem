import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";

const StaffDashboard = () => {

  const email = localStorage.getItem('email');
  const [data,setData] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('../')
  }

  const handleCreate = () => {
    navigate('../create-room')
  }


  useEffect(() => {
    const getData = async() => {
      const body = {email};
      const response = await fetch(`http://localhost:5000/staff-get-data`,{
        method:"POST",
        headers: {
          "Content-type":"application/json"
        },
        body:JSON.stringify(body)
      })
      const temp = await response.json()
      setData(temp);
    }

    getData()
    
  },[email]) 


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
          <CiCirclePlus className='plus-icon' onClick={handleCreate} />
        </div>
        <div style={{ borderTop: "1px solid white" }}></div>
        {data.map((item, index) => (
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