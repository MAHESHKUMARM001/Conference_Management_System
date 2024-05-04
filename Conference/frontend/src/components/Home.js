import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Email1 = params.get('email');

  const [name, setname] = useState('');

  
  useEffect(() => {
    
    async function fetchAllDocuments() {
      // try {
      //   const response = await axios.post("http://localhost:5000/profile", { Email1 });
        
      //     if (response.data === "Success") {
      //           console.log("successfully detail");
      //           // navigate(`/home?email=${encodeURIComponent(email)}`);
      //           setname(response.data.name);
      //       } else {
      //           console.log("the email already exists");
      //           setRegisterError(response.data.already);
      //       }
      // } catch (err) {
      //   setError(err.message);
      // }
    }

    fetchAllDocuments();
  }, []);

  // Check if the email address is maheshkumarm001234@gmail.com
  const isMaheshEmail = Email1 === 'maheshkumar001234@gmail.com';

  return (
    <div>
      <h1>Welcome Home!</h1>
      <p>Email: {Email1}</p><br/>
      
      {/* Conditional rendering based on email address */}
      {isMaheshEmail ? (
        <>
          {/* <button onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}>Upload</button> */}
          <button onClick={() => navigate(`/documents`)}>All Documents</button>
        </>
      ) : (
        <button onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}>Upload</button>
      )}
    </div>
  );
};

export default Home;
