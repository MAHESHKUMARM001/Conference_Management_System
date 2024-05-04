import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; // Import your CSS file

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleonSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post("http://localhost:5000/register", { name, email, password });
        
          if (response.data === "Success") {
                console.log("successfully registered");
                navigate(`/home?email=${encodeURIComponent(email)}`);
            } else {
                console.log("the email already exists");
                setRegisterError(response.data.already);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='loginbody'>
        <div className="wrapper" >
            <form onSubmit={handleonSubmit}>
                <h3 style={{color:"red"}}>{registerError}</h3>
                <h1>Registration</h1><br/>
                <label className='labelname'>Name</label>
                <div className="input-field">
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} className="input-field" /><br/>
                </div>
                <label className='labelname'>Email</label>
                <div className="input-field">
                <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" /><br/>
                </div>
                <label className='labelname'>Password</label>
                <div className="input-field">
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required/><br/>
                </div>
                <button type='submit' className='button001'>Register</button><br />
                <p style={{color:"white"}}>Already Have An account <a href='/' style={{color:'white'}}>Login</a></p>
                {/* <button onClick={()=>navigate("/login")}>Login</button> */}
            </form>
        </div>
        </div>
    );
};

export default Registration;
