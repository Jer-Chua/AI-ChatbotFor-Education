import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library


const PDFViewer = (props) => {
   
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
        props.setPDFFileOutside(selectedFile);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setViewPdf(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  // form submit
//   const handlePdfFileSubmit=(e)=>{
//     e.preventDefault();
//     if(pdfFile!==null){
//       setViewPdf(pdfFile);
//     }
//     else{
//       setViewPdf(null);
//     }
//   }

  return (
    <div style={{ float: "left", width: "45%", textAlign: "left", height:"90vh", overflow:"auto" }}>
    
      
        {viewPdf == null ?
        <>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {!viewPdf&&<p>No pdf file selected</p>}
        </div>
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}</>:null}
       
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
         >
          <Viewer fileUrl={viewPdf}
          
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      
      </div>

    </div>
  )
}

export default PDFViewer;