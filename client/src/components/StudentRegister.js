import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const StudentRegister = () => {

    const navigate = useNavigate();

    const [rollnumber,setRollnumber] = useState('');
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [year_of_joining,setYear_of_joining] = useState('');

    const handleRollnumber = (event) => {
        setRollnumber(event.target.value)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleYearofjoining = (event) => {
        setYear_of_joining(event.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            
            const body = {rollnumber,username,password,email,year_of_joining};
            const response = await fetch(`http://localhost:5000/registerstudent`,{
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body:JSON.stringify(body)
            });

            const data = await response.json();

            if(data.success == 1){
                alert("Registered Successfully");
                navigate('../student-login');
            }

            else{
                alert("Error in filling the form");
            }

            console.log(response);
            //window.location = '/student-login';


            setRollnumber('');
            setUsername('');
            setPassword('');
            setEmail('');
            setYear_of_joining('');

        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div className='main-body1'>
        <div className='login-container'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <div className='login'>
                    <div className='l1'><label htmlFor='rollnumber'>Roll number</label></div>
                    <div className='l2'><input 
                        type='text'
                        name='rollnumber'
                        id='rollnumber'
                        placeholder='Enter Roll number'
                        value={rollnumber}
                        onChange={handleRollnumber}
                    /></div>
                </div>
                <div className='login'>
                    <div className='l1'><label htmlFor='username'>Username</label></div>
                    <div className='l2'><input 
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Enter Name'
                        value={username}
                        onChange={handleUsername}
                    /></div>
                </div>
                
                <div className='login'>
                <div className='l1'><label htmlFor='password'>Password</label></div>
                <div className='l2'><input 
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={handlePassword}
                    /></div>
                </div>
                <div className='login'>
                <div className='l1'><label htmlFor='email'>Email</label></div>
                <div className='l2'> <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email id'
                        value={email}
                        onChange={handleEmail}
                    /></div>
                </div>
                
                <div className='login'>
                <div className='l1'><label htmlFor='yearofjoining'>Year of joining</label></div>
                <div className='l2'> <input 
                        type='text'
                        name='yearofjoining'
                        id='yearofjoinging'
                        placeholder='Enter Year of joining'
                        value={year_of_joining}
                        onChange={handleYearofjoining}
                    /></div>
                </div>

                <div className='login'>
                <p>Already an user..Click to <Link to="/student-login" style={{color:'darkseagreen',marginLeft:"5px",cursor:"pointer"}}>login</Link></p>
                <button className='submit-button' >Submit</button>
                </div>    
            </form>
        </div>
    </div>
  )
}

export default StudentRegister