import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import app from './firebase';
import './Upload.css'


const Upload1 = () => {
  const [file, setFile] = useState(null);
  const [progress1,setprogress] = useState(0);
  const [link, setlink] = useState('');

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [status, setstatus] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    file && uploadFile(file, "videoUrl");
  }, [file]);


  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Email1 = params.get('email');

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

  const isstatus = status === 'Not_Available';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = (e) => {

    const storage = getStorage(app);
    
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progressValue + '% done');
        setprogress(progressValue)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          console.log('File available at', downloadURL);
          setlink(downloadURL); // Update the link state here
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error getting download URL:", error);
        });
      }
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.post("http://localhost:5000/upload", { title, name, Email1, description, link });
        
    if (response.data === "Success") {
          console.log("successfully upload");
          navigate(`/home?email=${encodeURIComponent(Email1)}`);
      } else {
          console.log("the email already exists");
          // setRegisterError(response.data.already);
      }

  };

  return (
    <div>{
      isstatus ? (
      <div>
        <h2>Upload File</h2>
        <p>Uploading ...{progress1}</p>
        <form onSubmit={handleSubmit}>
          <label>Enter the Research Paper title</label><br />
          <input type='text' name='title' placeholder='filename' onChange={(e) => setTitle(e.target.value)} /><br />
          <label>author Name</label><br />
          <input type='text' name='name' placeholder='enter the author name' onChange={(e) => setName(e.target.value)} /><br />
          <label>Enter the Description for the document</label><br />
          <textarea rows={10} cols={50} name='description' placeholder='enter the description' onChange={(e) => setDescription(e.target.value)} /><br />

          <label>Upload the Document</label><br />
          <input type="file" onChange={handleFileChange} />
          
          <button type='submit' disabled={progress1 === 100 ? false : true}>Submit</button>
        </form>
      </div>
      ):(
        <>
        <p>Page Not Available</p>
        </>
      )}
    </div>
  );
};

export default Upload1;
