import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminId = (event) => {
        setAdminId(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (adminId !== '111' || password !== '111') {
            alert('Invalid credentials');
            return;
        }

        // localStorage.setItem('')
        // Simulating successful login
        alert('Login successful');

        localStorage.setItem('role','admin')

        // Redirect to the admin dashboard
        window.location.href = '../admin-dashboard'; // Change this to the correct path

        // If you want to use useNavigate() from react-router-dom, you should wrap your component with a Router component.
        // However, since this is not a JSX file, you can't use useNavigate() directly here.
        // You can either convert this file to a JSX file or use window.location.href as shown above.
    }
    
    return (
        <div className='main-body1'>
            <div className='login-container'>
                <form className='form-cont' onSubmit={handleSubmit}>
                    <div className='login'>
                        <label htmlFor='adminId'>Admin Id</label>
                        <input
                            type='text'
                            name='adminId'
                            id='adminId'
                            placeholder='Enter Admin Id'
                            value={adminId}
                            onChange={handleAdminId}
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
                    <div className='login'>
                        <p>Forgot password? <Link to='/admin-forgot-password' style={{ color: 'darkseagreen', marginLeft: "5px", cursor: "pointer" }}>Reset here</Link></p>
                        <button type="submit" className='submit-button'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
