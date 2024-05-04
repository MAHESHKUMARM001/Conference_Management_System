import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Only import Link
import axios from 'axios';
import './AllDocument.css'

function AllDocuments(probs) {
    const Email1=probs.Email;
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // Fetch documents from backend API
        axios.get('http://localhost:5000/documents')
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
            });
    }, []);

    return (
        <div className='document'>
            
            <ul>
                {documents.map(document => (
                    
                    <li key={document._id}>
                        <div className='cartwrap'>
                            <div className='cartsection'>
                                <p style={{fontSize:40}} >TITLE : {document.Title}</p>
                                <p style={{fontSize:20, color:'GrayText',paddingTop:20}}>Written By : {document.Author}</p>
                                <Link to={`/document/${document._id}?email=${encodeURIComponent(Email1)}`}><button className='button2'>More</button></Link>
                                <p style={{color: 'green',fontSize:20}}><b>{document.Status}</b></p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllDocuments;
