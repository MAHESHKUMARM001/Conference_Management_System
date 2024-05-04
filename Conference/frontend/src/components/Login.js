import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming the merged CSS is stored in a file named Login.css

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginer, setLoginer] = useState('');
    const navigate = useNavigate();

    const handleonSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });
            if (response.data === "Success") {
                console.log("Successfully logged in");
                navigate(`/home?email=${encodeURIComponent(email)}`);
            } else {
                setLoginer(response.data.loginerror);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className='loginbody'>
        <div className="wrapper">
            <form onSubmit={handleonSubmit}>
                <center>
                <h3 style={{color:"red"}}>{loginer}</h3>
                <h1 >Login Form</h1>
                </center>
                <label className='labelname'>Email</label>
                <div className="input-field">
                    <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <label className='labelname'>Password</label>
                <div className="input-field">
                    {/* <label>Password</label> */}
                    <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className='button001'>Submit</button><br />
                <p style={{color:"white"}}>Don't Have Any account <a href='/register' style={{color:'white'}}>Register</a></p>
                
                {/* <button onClick={() => navigate("/register")} className='button001'>Register</button> */}
            </form>
        </div>
        </div>
    );
}

export default Login;
