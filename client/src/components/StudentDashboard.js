import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

const StudentDashboard = () => {

  const rollnumber = localStorage.getItem('rollnumber');
  const [data, setData] = useState([])
  const [isClicked, setIsClicked] = useState(null);
  const [roomdata,setRoomdata] = useState({});

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('rollnumber');
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('../')
  }

  const calculateAttendance = (obj) => {
    const attend = ((obj.class_attended / obj.class_taken)*100).toFixed(2);
    return attend;
  }

  useEffect(() => {
    const getData = async () => {
      const body = { rollnumber };
      const response = await fetch(`http://localhost:5000/student-get-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const temp = await response.json()
      setData(temp);
    }
    getData()
  }, [rollnumber])

  useEffect(() => {
    const handleRoom = async (value) => {
      value.rollnumber = rollnumber;
      
      const response = await fetch(`http://localhost:5000/student-room`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(value)
      })
      const room_data = await response.json();
      console.log(room_data)
      setRoomdata(room_data);
    }
    if (isClicked) {
      handleRoom(isClicked);
    }
  }, [isClicked])



  return (
    <div className='main-body'>
      <Navbar />
      {!isClicked ?
        <div className='staff-dashboard'>
          <div className='staff-header'>
            <h1>Attendance List</h1>
          </div>
          <div style={{ borderTop: "1px solid rgb(13,13,13)" }}></div>
          {data.length > 0 ?
            <>
              {data.map((item, index) => (
                <div className='list-room' key={index} onClick={() => setIsClicked(item)}>
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
            </> :
            <div style={{ fontSize: "25px", padding: "30px" }}>
              No room found
            </div>
          }

        </div> :
        <div className='room-data-container'>
          <div className='room-data'>
            <div style={{width:"30%"}}>Subject code: </div>
            <div>{roomdata.subject_code}</div>  
          </div>
          <div className='room-data'>
            <div style={{width:"30%"}}>Subject name: </div>
            <div>{roomdata.subject_name}</div>
          </div>
          <div className='room-data'>
            <div style={{width:"30%"}}>Staff name: </div>
            <div>{roomdata.staff_name}</div>
          </div>
          <div className='room-data'>
            <div style={{width:"30%"}}>Classes taken: </div>
            <div>{roomdata.class_taken}</div>
          </div>
          <div className='room-data'>
            <div style={{width:"30%"}}>Classes attended: </div>
            <div>{roomdata.class_attended}</div>
          </div>
          <div className='room-data'>
            <div style={{width:"30%"}}>Attendance percentage: </div>
            <div>{calculateAttendance(roomdata)}</div>
          </div>
          <div className='room-data' >
            <div className='submit-button' onClick={() => setIsClicked(null)} style={{justifyContent:"center",textAlign:"center",paddingTop:"7px"}} >
              Back
              </div>
          </div>
        </div>
        
      }

    </div>
  )
}

export default StudentDashboard