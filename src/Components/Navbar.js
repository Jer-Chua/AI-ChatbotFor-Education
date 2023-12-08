import React, {useRef} from 'react';
import '../css/Navbar.css'

const Navbar = ({ onFileChange }) => {
  const uploadFile = useRef(null);
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
    <nav className="navbar">
      <div className="navbar-logo">EduAI</div>
      <ul className="navbar-list">
        <li><button onClick={() => { uploadFile.current.click() }}>Upload File</button></li>
        {/* <li><a href="#">Save</a></li> */}
        {/* <li><a href="#">Services</a></li> */}
        <li><input ref={uploadFile} type="file" accept=".js" style={{ display: "none" }} onChange={handleFileChange} /></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
