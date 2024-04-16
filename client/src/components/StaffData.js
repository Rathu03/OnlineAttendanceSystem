import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'

const StaffData = () => {

  const adminemail = localStorage.getItem('adminEmail')
  const [stafflist,setStafflist] = useState([])
  const [isStaffClicked,setIsStaffClicked] = useState(false)
  const [data,setData] = useState([])

  const getData = async (email) => {
    setIsStaffClicked(true) 
    const body = {email}
    const response = await fetch(`http://localhost:5000/staff-get-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const temp = await response.json()
      setData(temp);
  }


  useEffect(() => {
    const fetchStaffData = async() => {
      const response = await fetch(`http://localhost:5000/get-stafflist`,{
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const temp = await response.json()
      setStafflist(temp)
    }
    fetchStaffData() 
  },[])


  return (
    <div className='main-body'>
      <div className='staff-dashboard'>
        <div className='staff-header'>
          <h1>Staff List</h1>
          {!isStaffClicked && <CiCirclePlus className='plus-icon' onClick={() => {}}/>}
        </div>
        <div style={{ borderTop: "1px solid white" }}></div>
        {stafflist.length > 0 ? 
        <>
          {!isStaffClicked ? 
          <>
          {stafflist.map((item, index) =>(
            <div>
            <div className='list-card'>
              <div style={{width:"100px"}}>{item.teacherid}</div>
              <div style={{ width: "100px", cursor: "pointer"}} onClick = {() => getData(item.email)}>{item.teacher_name}</div> 
              <div style={{width:"100px"}}>{item.email}</div>
            </div>
            <div style={{ borderTop: "1px solid white" }}></div>
            </div>
          ))}
          </> : 
            <>
              {data.length > 0 ? 
              <>
                {data.map((item, index) => (
                    <div className='list-room' key={index} onClick={() => {}}>
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
              </> : 
              <>
                <div style={{ fontSize: "25px", padding: "30px" }}>
                  No room found
                </div> 
              </>}
            </>
          } 
        </> :
        <>
          <div style={{ fontSize: "25px", padding: "30px" }}>
            No staff found
          </div>
        </>}
        
      </div>
    </div>
  )
}

export default StaffData