import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import axios from 'axios';

const CertificateGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [namePosition, setNamePosition] = useState({ x: 220 , y: 300 });
  const [qrPosition, setQrPosition] = useState({ x: 710, y: 530 });
  const [pdfUrl, setPdfUrl] = useState('/certificate.pdf'); // Adjust path accordingly
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const bucketURL = "";// Add your own bucket URL here

  const generatePdfBlobUrl = async () => {
    try {
      // Fetch the existing PDF template
      const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Embed the name
      firstPage.drawText(name, {
        x: namePosition.x,
        y: firstPage.getHeight() - namePosition.y,
        size: 34,
        color: rgb(0, 0, 0),
      });

      const linkName = name.replace(/\s+/g, '');

      // Generate QR code data URL using the `qrcode` package
      const qrCodeUrl = await QRCode.toDataURL(`https://storage.googleapis.com/${bucketURL}/${linkName}`);

      // Embed the QR code in the PDF
      const qrImageBytes = await fetch(qrCodeUrl).then((res) => res.arrayBuffer());
      const qrImage = await pdfDoc.embedPng(qrImageBytes);
      firstPage.drawImage(qrImage, {
        x: qrPosition.x,
        y: firstPage.getHeight() - qrPosition.y,
        width: 70,
        height: 70,
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Convert to a blob URL to display in embed tag
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
    } catch (error) {
      console.error('Error generating the PDF:', error);
    }
  };

  // Regenerate PDF when name or positions change
  useEffect(() => {
    if (name) {
      generatePdfBlobUrl();
    }
  }, [name, namePosition, qrPosition]);

  const handleGeneratePdf = async () => {
    try {
      if (!pdfBlobUrl) {
        console.error('No PDF generated to send.');
        return;
      }
  
      // Fetch the PDF blob
      const pdfBlob = await fetch(pdfBlobUrl).then((res) => res.blob());
  
      // Prepare the FormData object to send the PDF and userName
      const formData = new FormData();
      formData.append('image', pdfBlob, `${name}.pdf`); // PDF file
      formData.append('userName', name); // User name
  
      // Send POST request to backend with the PDF and userName
      const response = await axios.post('http://localhost:3000/certificates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure form data is handled properly
        },
      });
  
      // If the response status is 201 (created), download the PDF
      if (response.status === 201) {
        const link = document.createElement('a');
        link.href = pdfBlobUrl;
        link.download = `${name}.pdf`;
        link.click();
      }
    } catch (error) {
      console.error('Error generating the PDF:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Certificate Generator</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="p-2 border rounded mb-4 w-full max-w-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex mb-4">
        <label className="mr-2">Name Position X:</label>
        <input
          type="number"
          value={namePosition.x}
          onChange={(e) => setNamePosition({ ...namePosition, x: Number(e.target.value) })}
          className="p-2 border rounded"
        />
        <label className="ml-4 mr-2">Y:</label>
        <input
          type="number"
          value={namePosition.y}
          onChange={(e) => setNamePosition({ ...namePosition, y: Number(e.target.value) })}
          className="p-2 border rounded"
        />
      </div>

      <div className="flex mb-4">
        <label className="mr-2">QR Position X:</label>
        <input
          type="number"
          value={qrPosition.x}
          onChange={(e) => setQrPosition({ ...qrPosition, x: Number(e.target.value) })}
          className="p-2 border rounded"
        />
        <label className="ml-4 mr-2">Y:</label>
        <input
          type="number"
          value={qrPosition.y}
          onChange={(e) => setQrPosition({ ...qrPosition, y: Number(e.target.value) })}
          className="p-2 border rounded"
        />
      </div>

      <button
        onClick={handleGeneratePdf}
        className="bg-blue-500 text-white p-3 rounded mt-4"
      >
        Generate and Download PDF
      </button>

      {/* Display the PDF on the screen */}
      {pdfBlobUrl && (
        <div className="mt-8">
          <embed src={pdfBlobUrl} width="600" height="800" type="application/pdf" />
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
