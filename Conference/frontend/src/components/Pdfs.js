import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pdfs() {
  const [pdfPaths, setPdfPaths] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/documents/upload');
        const { tempFilePaths } = response.data;
        setPdfPaths(tempFilePaths);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchPdfs();
  }, []);

  return (
    <div>
      <h1>All PDFs</h1>
      <div className="pdf-container">
        {pdfPaths.map((filePath, index) => (
          <div key={index} className="pdf-item">
            <iframe
              src={filePath}
              width="600"
              height="400"
              title={`PDF-${index}`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pdfs;
