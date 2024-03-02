import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";
import { MdCheck } from "react-icons/md";

const StaffDashboard = () => {

  const email = localStorage.getItem('email');
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(null)
  const [roomdata, setRoomdata] = useState([]);
  const [selectedStudents ,setSelectedStudents] = useState([]);
  const [numofhours,setNumofhours] = useState("");

  const selectedStudentsData = roomdata.filter(obj => selectedStudents.includes(obj.rollnumber));
  const notSelectedStudentsData = roomdata.filter(obj => !selectedStudents.includes(obj.rollnumber));

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('../')
  }

  const handleCreate = () => {
    navigate('../create-room')
  }

  const handleCheckboxChange = (rollnumber) => {
    setSelectedStudents((prevSelectedStudents) => {
      if(prevSelectedStudents.includes(rollnumber)) {
        return prevSelectedStudents.filter((student) => student !== rollnumber);
      }
      else{
        return [...prevSelectedStudents,rollnumber];
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {selectedStudentsData,notSelectedStudentsData,numofhours};
    console.log(body)
    const response = await fetch(`http://localhost:5000/attendance`,{
      method:"POST",
      headers: {
        "Content-type":"application/json"
      },
      body:JSON.stringify(body)
    });
    
    setNumofhours("")
    setSelectedStudents([]);
  }

  useEffect(() => {
    const getData = async () => {
      const body = { email };
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
    getData()
  }, [email])

  useEffect(() => {
    const handleRoom = async (value) => {
      value.email = email;
      const response = await fetch(`http://localhost:5000/get-staff-data`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(value)
      })
      const data = await response.json();
      console.log(data);
      setRoomdata(data);
    }
    if (isClicked) {
      handleRoom(isClicked)
    }
  }, [isClicked])

  return (
    <div className='main-body'>
      <div className='nav-container'>
        <h1>Staff Dashboard</h1>
        <ul>
          <li onClick={handleClick}>Logout</li>
        </ul>
      </div>
      {!isClicked ?
        <>
          <div className='staff-dashboard'>
            <div className='staff-header'>
              <h1>Attendance List</h1>
              <CiCirclePlus className='plus-icon' onClick={handleCreate} />
            </div>
            <div style={{ borderTop: "1px solid white" }}></div>
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
                        <div>Sem: {item.sem}</div>
                        <div>Credits: {item.credits}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </> :
              <div style={{ fontSize: "25px", padding: "30px" }}>
                No room found
              </div>
            }
          </div>
        </> :
        <>
          <form className='attendance-section' onSubmit={handleSubmit}>
            <div className='login'>
              <div className='l1'>
                <label htmlFor='numofhours'>Number of hours</label>
              </div>
              <div className='l2'>
                <input
                  type='text'
                  name='numofhours'
                  id='numofhours'
                  placeholder='Enter number of hours'
                  value={numofhours}
                  onChange={(e) => setNumofhours(e.target.value)}
                /></div>
            </div>
            <table className='attendance-list'>
              <thead>
                <tr>
                  <th><MdCheck /></th>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                </tr>
              </thead>
              <tbody>
                {roomdata.map((obj) => (
                  <tr key={obj.rollnumber}>
                    <td>
                      <label>
                        <input
                          type='checkbox'
                          onChange={() => handleCheckboxChange(obj.rollnumber)}
                          checked={selectedStudents.includes(obj.rollnumber)}
                          style={{ transform: "scale(1.5)" }}
                        />
                      </label>
                    </td>
                    <td>{obj.rollnumber}</td>
                    <td>{obj.student_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='submit-button' onClick={() => setIsClicked(null)} style={{ justifyContent: "center", textAlign: "center", paddingTop: "7px" }} >
              Back
            </div>
            <div>
            <button className='submit-button'>Submit</button>
            </div>
            
          </form>
        </>
      }

    </div>
  )
}

export default StaffDashboard