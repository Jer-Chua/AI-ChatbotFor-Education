import React from 'react';

const FileUpload = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      onFileChange(content);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".js" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
