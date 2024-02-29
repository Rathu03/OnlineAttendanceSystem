import React, { useState } from 'react'
import * as XLSX from 'xlsx'

const CreateRoom = () => {

    const [selectedFile,setSelectedFile] = useState(null);
    const [excelData,setExcelData] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setSelectedFile(file);
            console.log('Selected Excel file:', file);
          } else {
            console.log('Please select an Excel file.');
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedFile){
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data,{type:'binary'});
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const extractedData = XLSX.utils.sheet_to_json(sheet,{header:1})
                setExcelData(extractedData)
                console.log(extractedData)
            }
            reader.readAsBinaryString(selectedFile);
        }
        else{
            setExcelData(null)
            console.log('Please select an Excel file')
        }
    }
  return (
    <div className='main-body1'>
        <div className='login-container'>
            <form className='form-cont' style={{rowGap:"60px"}} onSubmit={handleSubmit}>
                <div className='login'>
                    <div className='l1'><label htmlFor='subject-code'>Subject Code</label></div>
                    <div className='l2'>
                        <input 
                            type='text'
                            name='subject-code'
                            id='subject-code'
                            placeholder='Enter Subject code'
                        />
                    </div>
                </div>
                <div className='login'>
                <div className='l1'><label htmlFor='file' style={{color:"rgb(4,144,4)"}}>Please enter student list in excel format</label></div>
                </div>
                <div className='login'>
                    <div className='l2' style={{margin:"10px"}}>
                        <input type="file" id="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </div>
                </div>
                <div className='login'>
                    <button className='submit-button'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateRoom