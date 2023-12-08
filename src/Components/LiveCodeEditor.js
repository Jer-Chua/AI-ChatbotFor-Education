// LiveEditor.js
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

const LiveCodeEditor = ({ code }) => {
    console.log(code)
    const clickfunction = () => {
        // Your function logic here
        console.log('Button clicked!');
      };
  return (
    <LiveProvider code={`

const Navbar = ({  }) => {
  const uploadFile = react.useRef(null);


  return (
    <div className="navbar">
      <div className="navbar-logo">EduAI</div>
      <ul className="navbar-list">
        <li>
          <button onClick={() => uploadFile.current.click()}>Upload File</button>
        </li>
        <li>
          <a href="#">Save</a>
        </li>
      </ul>
      <input
        ref={uploadFile}
        type="file"
        accept=".js"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Navbar;
`}>
      {/* <LiveEditor /> */}
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default LiveCodeEditor;
