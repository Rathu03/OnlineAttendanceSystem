import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StaffLogin = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [teacherid,setTeacherid] = useState("")

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleForgot = async() => {
        const  role = "staff";
        if(email == ""){
            alert("Please enter your email")
            return
        }
        const body = {email,role};
        alert("Check your mail")
        const response = await fetch(`http://localhost:5000/forgotpassword`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        })
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const body = {email,password,teacherid};
            const response = await fetch(`http://localhost:5000/loginstaff`,{
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json()
            console.log(data)
            if(data.success){
                navigate('../staff/attendance')
            }
            else{
                alert('Invalid credentials');
                return;
            }
            localStorage.setItem('email',email);
            localStorage.setItem('token',data.token);
            localStorage.setItem('role','staff');
            localStorage.setItem('teacherid',teacherid)
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <div className='main-body1'>
    {/* <div class="https://images.shiksha.com/mediadata/images/1511170235phpiYzFC7.jpeg"></div> */}
        <div className='login-container'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <div className='login'>
                    <label htmlFor='email'>Email Id</label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className='login'>
                    <label htmlFor='teacherid'>Teacher Id</label>
                    <input 
                        type='text'
                        name='teacherid'
                        id='teacherid'
                        placeholder='Enter teacher Id'
                        value={teacherid}
                        onChange={(e) => setTeacherid(e.target.value)}
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
                <div className='login'><p style={{cursor:"pointer"}} onClick={handleForgot}>Forgot password</p>
                    <button className='submit-button'>Submit</button>
                </div>
            </form>
            <div className='login'>
                <button className='back-button' onClick={() => navigate('../')}>Back</button>
                <p>Already have an account? <Link to="/staff-register" style={{ color: 'darkseagreen', marginLeft: "5px", cursor: "pointer" }}>Login now</Link></p>
            </div>
        </div>
    </div>
  )
}

export default StaffLogin