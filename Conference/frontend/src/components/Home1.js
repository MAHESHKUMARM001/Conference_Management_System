import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home1 = () => {
    const navigate = useNavigate();
  return (
    <div>Home1
        <br/>
        <button onClick={() => navigate("/login")} > login </button>
    </div>
  )
}

export default Home1