// DocumentDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';
import './DocumnetDetail.css'
import { useNavigate, useLocation } from 'react-router-dom';

function DocumentDetail() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const navigate = useNavigate();
    const [newstatus, setnewstatus] = useState('');
    const [Email,setEmail] = useState('');

   
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const Email2 = params.get('email');

    useEffect(() => {
        // Fetch document details from backend API based on the id
        axios.get(`http://localhost:5000/document/${id}`)
            .then(response => {
                setDocument(response.data);
                setEmail(response.data.Email)
            })
            .catch(error => {
                console.error('Error fetching document:', error);
            });
    }, [id]);
    const Email1 = Email;
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
    
    const isstatus = newstatus === 'Approved';
    if (!document) {
        return <div>Loading...</div>;
    }

    
    const handleonSubmit = async (e) => {
        // e.preventDefault();
        try {
           const response = await axios.post(`http://localhost:5000/approve/${id}`);
        
          if (response.data === "approved") {
                console.log("successfully registered");
                navigate(`/profile?email=${encodeURIComponent(Email2)}`);
            } else {
                console.log("the email already exists");
                // setRegisterError(response.data.already);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='containerfull'>
                <div className='containernew'>
                    <center>
                    <b className='headings' style={{fontSize:40}}>{document.Title}</b>
                    </center>
                    <p style={{fontSize:20}}><b>Author:</b> {document.Author}</p>
                    <p style={{fontSize:20}}><b>Email: </b>{document.Email}</p>
                    <p style={{fontSize:20, paddingBottom:30}}><b>escription: </b>{document.Description}</p>
                    {/* <Worker>
                        <Viewer fileUrl={document.Link} />
                    </Worker> */}
                    <center>
                    <iframe src={document.Link} width="1300" height="800" title="Document Preview"/>
                    </center>
                    <br/>
                    
                    {/* <button className='button3' onClick={() => handleonSubmit()}>Approve</button> */}
                    {
                          isstatus ? (
                                <>
                                    {/* <button onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}>Upload</button> */}
                                    {/* <button className='button1' onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}><b>Participate</b></button> */}
                                    <center><p style={{fontSize:20,paddingTop:30}}>The paper is Approved</p></center>
                                </>
                            ) : (
                              <>
                              <button className='button3' onClick={() => handleonSubmit()}>Approve</button>
                                </>
                            )
                          }

                </div>
            </div>
        </div>
        
    );
}

export default DocumentDetail;
