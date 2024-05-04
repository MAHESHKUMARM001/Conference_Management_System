// import React, { useState } from 'react';

// const PdfUploader = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [base64String, setBase64String] = useState('');
//   const [inputBase64String, setInputBase64String] = useState('');

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPdfFile(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!pdfFile) {
//       alert('Please select a PDF file');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result.replace('data:application/pdf;base64,', '');
//       setBase64String(base64String);
//     };
//     reader.readAsDataURL(pdfFile);
//   };

//   const handleInputChange = (e) => {
//     setInputBase64String(e.target.value);
//   };

//   const handleConvertBack = () => {
//     // Convert Base64 string to PDF
//     // Create a Blob from the Base64 string
//     const byteCharacters = atob(inputBase64String);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);

//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     const blob = new Blob(byteArrays, { type: 'application/pdf' });

//     // Create a URL for the Blob
//     const url = URL.createObjectURL(blob);

//     // Open the PDF in a new tab
//     window.open(url);
//   };

//   return (
//     <div>
//       <h2>PDF Uploader</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept=".pdf" onChange={handleFileChange} />
//         <button type="submit">Submit</button>
//       </form>
//       {base64String && (
//         <div style={{ color: 'blue' }}>
//           <h3>Base64 String:</h3>
//           <p>{base64String}</p>
//         </div>
//       )}
//       <div>
//         <h3>Convert Base64 String to PDF:</h3>
//         <textarea value={inputBase64String} onChange={handleInputChange} />
//         <button onClick={handleConvertBack}>Convert to PDF</button>
//       </div>
//     </div>
//   );
// };

// export default PdfUploader;
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function base() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hashValue, setHashValue] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileData = event.target.result;
        const hash = CryptoJS.SHA256(fileData).toString();
        setHashValue(hash);
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  return (
    <div>
      <h1>PDF Upload and Hashing</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Hash</button>
      <div>
        {hashValue && (
          <div>
            <h2>Hash Value:</h2>
            <p>{hashValue}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Base;
