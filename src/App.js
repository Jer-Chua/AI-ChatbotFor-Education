import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import CodeEditor from './Components/CodeEditor';
import FileUpload from './Components/FileUpload';
import Navbar from './Components/Navbar';
import AIChatbot from './Components/AIChatbot'
import LiveCodeEditor from './Components/LiveCodeEditor';
import IframeResizer from 'iframe-resizer-react';
import PDFViewer from './Components/PDFViewer';

function App() {
  const [code, setCode] = useState({});
  const previewRef = useRef(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [topicOutside, setTopicOutside] = useState("optimize");
  const [pdfFileOutside, setPDFFileOutside] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleFileUpload = (fileContent) => {
    var newCodeDict = { ...code };
    console.log(Object.keys(newCodeDict).length)
    if(Object.keys(newCodeDict).length <= 0){
      newCodeDict[`Code 1`] = fileContent
    }
    else{
      newCodeDict[`Code ${Object.keys(newCodeDict).length + 1}`] = fileContent;
    }
    
    setCode(newCodeDict);
  };

  useEffect(() => {
    console.log(pdfFileOutside);
  }, [pdfFileOutside])


  return (
    <div className="App">

      <Navbar onFileChange={handleFileUpload} />
      {/* <FileUpload onFileChange={handleFileUpload} /> */}
      {topicOutside == "question_quiz" ?
        <PDFViewer setPDFFileOutside={setPDFFileOutside}/>
        :
        <CodeEditor code={code} selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} onChange={handleCodeChange} />
      }
      <AIChatbot code={code} selectedComponent={selectedComponent} onChange={handleCodeChange} topicOutside={topicOutside} setTopicOutside={setTopicOutside} pdfFileOutside={pdfFileOutside}  ></AIChatbot>
      {/* <LiveCodeEditor code={code}/> */}
      {/* <div>
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter JavaScript code here"
      />
      <button onClick={runCode}>Run</button>
      <div>
        <iframe
          title="Preview"
          ref={previewRef}
          style={{ width: '100%', border: 'none' }}
        />
      </div>
    </div> */}
    </div>
  );
}

export default App;
