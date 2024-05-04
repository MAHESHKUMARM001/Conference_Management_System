import React, { useState } from 'react';
import axios from 'axios';
import {  useLocation, useNavigate } from 'react-router-dom'

const UploadDocument = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [upload, setUploadError] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfPreview, setPdfPreview] = useState('');

    const navigate= useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const Email1 = params.get('email');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
        
        // Preview PDF
        const reader = new FileReader();
        reader.onloadend = () => {
            setPdfPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
    
        if (!pdfFile) {
            alert('Please select a PDF file');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('name', name);
            formData.append('Email1', Email1);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('document', pdfFile); // Append the file to formData
    
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data === "Success") {
                console.log("successfully Uploaded");
                navigate(`/home?email=${encodeURIComponent(Email1)}`);
            } else {
                console.log("the title already exists");
                setUploadError(response.data.already);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div>
            <p>{upload}</p>
            <form onSubmit={handleOnSubmit}>
                <label>Enter the Research Paper title</label><br/>
                <input type='text' name='title' placeholder='filename' value={title} onChange={(e) => setTitle(e.target.value)}/><br/>
                <label>author Name</label><br/>
                <input type='text' name='name' placeholder='enter the author name' value={name} onChange={(e) => setName(e.target.value)} /><br/>
                <label>Category</label><br/>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">--Select a category--</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Electical and Electronics Engineering">Electical and Electronics Engineering</option>
                    <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                </select><br/>
                
                <label>Enter the Description for the document</label><br/>
                <textarea rows={10} cols={50} placeholder='enter the description' value={description} onChange={(e) => setDescription(e.target.value)}/><br/>
                <label>Upload the Document</label><br/>
                <input type='file' name='file' accept='.pdf' placeholder='choose PDF file' onChange={handleFileChange}/><br/>
                
                {/* PDF Preview */}
                {pdfPreview && (
                    <div>
                        <h3>PDF Preview</h3>
                        <embed src={pdfPreview} width="500" height="600" type="application/pdf" style={{paddingLeft:30}}/>
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UploadDocument;
