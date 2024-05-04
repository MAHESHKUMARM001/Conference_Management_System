import React, { useState, useEffect } from 'react'
import './Profile001.css'
import AllDocuments from './AllDocuments'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const Profile001 = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Email1 = params.get('email');

  const [name, setname] = useState('');
  const [status, setstatus] = useState('');
  const [newstatus, setnewstatus] = useState('');


    useEffect(() => {
    
        async function fetchAllDocuments() {
          try {
            const response = await axios.post("http://localhost:5000/profile", { Email1 });
            setname(response.data);

          } catch (err) {
            // setErro(err.message);
          }
        }
    
        fetchAllDocuments();
      }, [Email1]);

  useEffect(() => {
    
    async function fetchAllDocuments() {
      try {
        const response = await axios.post("http://localhost:5000/documentsta", { Email1 });
        setstatus(response.data);

      } catch (err) {
        // setErro(err.message);
      }
    }

    fetchAllDocuments();
  }, [Email1]);
  useEffect(() => {
    
    async function fetchAllDocuments() {
      try {
        const response = await axios.post("http://localhost:5000/status", { Email1 });
        setnewstatus(response.data);

      } catch (err) {
        // setErro(err.message);
      }
    }

    fetchAllDocuments();
  }, [Email1]);
  const isMaheshEmail = Email1 === 'maheshkumar001234@gmail.com';
  const isstatus = status === 'Not_Available';
  return (
    <div>
        <div className='wrap'>
            {/* <div className='container'>
                    <p ><b className='headings'>EDITOR DASHBOARD</b></p>
                    <p style={{color:'GrayText',fontSize:15,paddingTop:5}}>The Editor is Review and give the Approve status of the research paper</p>  
            </div>
            <div className='papers'>
                
            <AllDocuments /> */}
            {isMaheshEmail ? (
              <>
              <div className='container'>
                  <p ><b className='headings'>EDITOR DASHBOARD</b></p>
                  <p style={{color:'GrayText',fontSize:15,paddingTop:5}}>The Editor is Review and give the Approve status of the research paper</p>  
              </div>
              <div className='papers'>
          
                <AllDocuments Email = {Email1} />
              </div>
              </>
                        ) : (
                          <>
                          <div className='container'>
                              <p ><b className='headings'>WELCOME {name}</b></p>
                              <p style={{color:'GrayText',fontSize:15,paddingTop:5}}>The research Papers are viewed by Editor and give the response on this page</p>  
                          </div>{
                          isstatus ? (
                                <>
                                    {/* <button onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}>Upload</button> */}
                                    <button className='button1' onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}><b>Participate</b></button>
                                </>
                            ) : (
                              <>
                              <center>
                                <p style={{fontSize:20,paddingTop:30}}>You are uploaded successfully. Thank you for your participation.</p>
                              </center>
                                </>
                            )
                          }
                          <center>
                          <p style={{paddingTop:40,fontSize:30}}>Your Status is {newstatus}</p>
                          
                          </center>
                          </>
                          
                            
            )}
            </div>
        </div>
  )
}

export default Profile001