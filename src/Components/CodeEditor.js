import React, { useEffect, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import '../css/CodeEditor.css';


const CodeEditor = ({ code, selectedComponent, setSelectedComponent, onChange }) => {


  const [codeCopy, setCodeCopy] = useState({ ...code });
  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  const handleCodeChange = (value) => {
    console.log(Object.keys(codeCopy).length);
    if (Object.keys(codeCopy).length <= 0) {
      setCodeCopy({
        "Code 1": value,
      });
      setSelectedComponent('Code 1')
    }
    else {
      // Update the codeCopy object with the changed code for the selected component
      setCodeCopy({
        ...codeCopy,
        [selectedComponent]: value,
      });
    }

  };
  const saveCode = () => {
    // Update the main code object with the changes
    onChange(codeCopy);
  };

  const deleteCode = () => {
    var newCodeCopied = { ...codeCopy };
    delete newCodeCopied[selectedComponent];
    setCodeCopy(newCodeCopied);
    onChange(newCodeCopied);
    setSelectedComponent(null);
  }

  useEffect(() => {

    setCodeCopy(code);
  }, [code])


  return (
    <div style={{ float: "left", width: "45%", textAlign: "left" }}>
      <div id="codeDictionary" style={{ flexDirection: "row", display: "flex", overflowX: "auto" }}>

        {Object.keys(codeCopy).map((componentName) => (
          <button
            style={{ backgroundColor: "transparent", border: "1px solid #c1c1c1", borderRadius: "8px", margin: "5px", whiteSpace: "nowrap" }}
            key={componentName}
            onClick={() => handleComponentChange(componentName)}
          >
            {componentName}
          </button>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        <i
          className="fa-regular fa-floppy-disk"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            paddingTop: '15px',
            paddingRight: '50px',
            zIndex: '1',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => saveCode()}
        ></i>
        <i class="fa-solid fa-trash"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            paddingTop: '15px',
            paddingRight: '20px',
            zIndex: '1',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => deleteCode()}></i>

        <CodeMirror
          value={codeCopy[selectedComponent]}
          height={Object.keys(codeCopy).length === 0 ? "90.3vh" : "85.2vh"}
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={(editor, data, value) => {
            handleCodeChange(editor);
          }}
        />
      </div>


    </div>

  );
};

export default CodeEditor;


