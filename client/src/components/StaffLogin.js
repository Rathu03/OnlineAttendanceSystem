import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const StaffLogin = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const body = {email,password};
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
                navigate('../staff-dashboard')
            }
            else{
                alert('Invalid credentials');
                return;
            }
            localStorage.setItem('email',email);
            localStorage.setItem('token',data.token);
            
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
                    <label htmlFor='email'>EmailId</label>
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
                <p>Didn't have an account..Click to <Link to='/staff-register' style={{color:'darkseagreen',marginLeft:"5px",cursor:"pointer"}} >create account</Link></p>
                </div>
            </form>
           
        </div>
    </div>
  )
}

export default StaffLogin