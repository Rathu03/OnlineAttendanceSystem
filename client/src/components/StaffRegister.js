import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StaffRegister = () => {

  const navigate = useNavigate();

  const [teacher_name,setTeacher_name] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');


  const handleTeacherName = (e) => {
    setTeacher_name(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const body = {teacher_name,password,email};
      const response = await fetch(`http://localhost:5000/registerstaff`,{
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify(body)
      })
      const data = await response.json();
      console.log(data);

      if(data.success == 1){
        alert("Registered Successfully")
        navigate('../staff-login')
      }
      else{
        alert("Error in filling the form")
      }

      setTeacher_name('')
      setEmail('')
      setPassword('')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='main-body1'>
      <div className='login-container'>
        <form className='form-cont' onSubmit={handleSubmit}>
          <div className='login'>
            <div className='l1'><label htmlFor='teacher_name'></label>Staff name</div>
            <div className='l2'><input
              type='text'
              name='teacher_name'
              id='teacher_name'
              placeholder='Enter Staff name'
              value={teacher_name}
              onChange={handleTeacherName}
            /></div>
          </div>
          <div className='login'>
            <div className='l1'><label htmlFor='password'>Password</label></div>
            <div className='l2'><input
              type='text'
              name='password'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={handlePassword}
            /></div>
          </div>

          <div className='login'>
            <div className='l1'><label htmlFor='email'>Email</label></div>
            <div className='l2'><input
              type='email'
              name='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={handleEmail}
            /></div>
          </div>

          <div className='login'>
            <p>Already an user..Click to <Link to="/staff-login" style={{ color: 'darkseagreen', marginLeft: "5px", cursor: "pointer" }}>login</Link></p>
            <button className='submit-button' >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StaffRegister