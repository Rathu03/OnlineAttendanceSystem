import React, { useState } from 'react'


const StaffLogin = () => {

    const [staffId,setStaffId] = useState("");
    const [password,setPassword] = useState("");

    const handleStaff = (event) => {
        setStaffId(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }


  return (
    <div className='main-body1'>
        <div className='login-container'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <div className='login'>
                    <label htmlFor='staff-id'>Staff Id</label>
                    <input 
                        type='text'
                        name='staff-id'
                        id='staff-id'
                        placeholder='Enter Staff Id'
                        value={staffId}
                        onChange={handleStaff}
                    />
                </div>
                <div className='login'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <div className='login'><p>Forget password</p>
                <button className='submit-button'>Submit</button></div>
                <div className='login'>
                <p>Didn't have an account..Click to <span style={{color:'darkseagreen',marginLeft:"5px"}}>create account</span></p>
                </div>
            </form>
           
        </div>
    </div>
  )
}

export default StaffLogin