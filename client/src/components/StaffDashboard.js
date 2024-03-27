import React, { useDebugValue, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";
import { MdCheck } from "react-icons/md";


const StaffDashboard = () => {

  const email = localStorage.getItem('email');
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(null)
  const [roomdata, setRoomdata] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [numofhours, setNumofhours] = useState("");
  const [textarea,setTextarea] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [clickAbsentee,setClickAbsentee] = useState(false);
  const [absenteeData,setAbsenteeData] = useState([]);
  const [absentStudentData,setAbsentStudentData] = useState([])
  const [presentStudentData,setPresentStudentData] = useState([])
  
  
  const selectedStudentsData = roomdata.filter(obj => selectedStudents.includes(obj.rollnumber));
  const notSelectedStudentsData = roomdata.filter(obj => !selectedStudents.includes(obj.rollnumber));

  // const absentStudentData = roomdata.filter(obj => absentStudents.includes(obj.rollnumber));
  // const presentStudentData = roomdata.filter(obj => !absentStudents.includes(obj.rollnumber));

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
    if (rollnumber == 'selectAll') {
      setSelectAll(!selectAll)
      setSelectedStudents(selectAll ? [] : roomdata.map(obj => obj.rollnumber))
    }
    else {
      setSelectedStudents((prevSelectedStudents) => {
        if (prevSelectedStudents.includes(rollnumber)) {
          return prevSelectedStudents.filter((student) => student !== rollnumber);
        }
        else {
          return [...prevSelectedStudents, rollnumber];
        }

      })
    }
  }

  const handleAbsenteeChange = (e) => {
    const inputValue = e.target.value;
    setTextarea(inputValue);
    const splitValues = inputValue.split(',').map(value => value.trim());
    setAbsenteeData(splitValues);
};


const handleAbsentSubmit = async(e) => {
  e.preventDefault();  

  var absent = [];

  absenteeData.map(item => (
    absent.push(roomdata.filter(obj => item.includes(obj.rollnumber))[0])
  ))

  var absentroll = []
  for(var i=0;i<absent.length;i++){
    absentroll.push(absent[i].rollnumber)
  }

  console.log(absentroll)
  const absentStudents = roomdata.filter(obj => absentroll.includes(obj.rollnumber));
  const presentStudents = roomdata.filter(obj => !absentroll.includes(obj.rollnumber));


  setAbsentStudentData(absentStudents)
  setPresentStudentData(presentStudents)
  
  const body = {presentStudentData,absentStudentData,numofhours}
  console.log(body)

  const response = await fetch(`http://localhost:5000/attendance1`,{
    method:"POST",
    headers: {
      "Content-type": "application/json"
    },
    body:JSON.stringify(body)
  });

  const data = await response.json();
  if(!data.success){
    alert("Error in entering absentees")
  }
  else{
    alert("Marked successfully")
  }

  setNumofhours("");
  setTextarea("")
 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { selectedStudentsData, notSelectedStudentsData, numofhours };
    console.log(body)
    console.log(roomdata)
    const response = await fetch(`http://localhost:5000/attendance`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if(!data.success){
      alert("Error in entering absentees")
    }
    else{
      alert("Marked successfully")
    }

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
      console.log(data)
      setRoomdata(data);
    }
    if (isClicked) {
      handleRoom(isClicked)
    }

  }, [isClicked])

  useEffect(() => {
    if (selectAll) {
      if (notSelectedStudentsData.length != 0) {
        setSelectAll(false);
      }
    }
    if (notSelectedStudentsData == 0) {
      setSelectAll(true)
    }
  })

 
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
        {!clickAbsentee ? 
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
                  <th>
                    <MdCheck />
                    <input
                      type='checkbox'
                      onChange={() => handleCheckboxChange('selectAll')}
                      checked={selectAll}
                    />

                  </th>
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

            <div className='form-footer'>
              <button className='submit-button' onClick={() => setClickAbsentee(true)}>Absentee</button>
              <div className='footer'>
                <button className='submit-button' onClick={() => setIsClicked(null)}   >
                  Back
                </button>
                <button className='submit-button'>
                  Submit
                </button>
                <button 
                className='submit-button'
                onClick={() =>navigate('attendance-view') }
                >
                  View
                </button>
              </div>
            </div>
          </form>
          </> : 
          <>
            <form className='attendance-section' onSubmit={handleAbsentSubmit}>
              <div className='atten-login-cont'>
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
                    />
                  </div>
                </div>
                <div className='text-area'>
                  <div>
                    <label htmlFor='absentees'>Enter absentees</label>
                  </div>
                  <div >
                  <textarea 
                  rows="4" 
                  cols="50" 
                  placeholder="Enter your text here"
                  value={textarea}
                  onChange={handleAbsenteeChange}
                  ></textarea>
                  </div>
                </div>
              </div>
              <div className='form-footer'>
                  <div className='footer'>
                    <button className='submit-button' onClick={() => setClickAbsentee(false)}>
                      Back
                    </button>
                    <button className='submit-button'>
                      Submit
                    </button>
                  </div>
              </div>
            </form>
          </>
          }
        </>
      }

    </div>
  )
}

export default StaffDashboard