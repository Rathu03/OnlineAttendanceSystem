import React, { useState } from 'react'


const AdminLogin = () => {

    const [adminId,setAdminId] = useState("");
    const [password,setPassword] = useState("");

    const handleAdmin = (event) => {
        setAdminId(event.target.value);
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
                    <label htmlFor='admin-id'>Admin Id</label>
                    <input 
                        type='text'
                        name='admin-id'
                        id='admin-id'
                        placeholder='Enter Admin Id'
                        value={adminId}
                        onChange={handleAdmin}
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
                
            </form>
           
        </div>
    </div>
  )
}

export default AdminLogin