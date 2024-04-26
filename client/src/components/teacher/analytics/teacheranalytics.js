import { React, useState, useRef, useEffect } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import { Chart } from "react-google-charts";

function Teacheranalytics() {
    const userRef = useRef(null);
    const [rollNumber, setRollNumber] = useState('');
    var teacherid=useRef(null);
    const [basicacademic, setbasicacademic] = useState(null);
    const [marks, setMarks] = useState(null);
    const [sem, setSem] = useState(null);
    const [gpa, setGpa] = useState(null);
    const [studentlist,setstudentlist] = useState(null);
    const [selectedsubjectid,setselectedsubjectid] = useState(null);
    const [subjectclicked, setsubjectclicked] = useState(false);
    const [statistics, setstatistics] = useState([]);
    var maxmark,avgmark;
    const handleInputChange1 = (event) => {
        setRollNumber(event.target.value);
    };
    const [subjectlist,setSubjectlist]=useState([]);
    const subjectclick=(subjectId)=>{
        setselectedsubjectid(subjectId);
        teacherid=localStorage.getItem('teacherid');
axios.get(`http://localhost:5000/getstudentlist/${teacherid}/${subjectId}`)
.then((response)=>{
    console.log('student list',response.data);
setstudentlist(response.data);
})
.catch((error) => {
    console.log(error);
})
axios.get(`http://localhost:5000/getstudentstatistics/${teacherid}/${subjectId}`)
.then((response)=>{
if(response.data){
    console.log('student statistics',response.data[0].average_mark);
    avgmark=response.data[0].average_mark;
    maxmark=response.data[0].max_mark;
    setstatistics(response.data[0]);
   
}
})
.catch((error) => {
    console.log(error);
})
    }
    useEffect(()=>{
        teacherid.current=localStorage.getItem('teacherid');
        
        axios.get(`http://localhost:5000/getstaffsubjects/${teacherid.current}`)
        .then(response => {
            if(response.data){
                console.log('response data', response.data)
                
                setSubjectlist(response.data);
              
                console.log('subjectlist', subjectlist)
                
            }
            else{
                alert('no subjects found');
            }
        })
        .catch(err => {
        console.log(err);
        })
    },[])
    useEffect(()=>{

    },[subjectlist])
  
    useEffect(() => {
       
            axios.get(`http://localhost:5000/getgpa/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    setGpa(response.data);
                     renderGpaChart(response.data);
                    console.log("gpa",response.data);
                } else {
                    setGpa(null);
                    alert('No GPA found');
                }
            })
            .catch(err => {
                console.log(err);
            });
            axios.get(`http://localhost:5000/getstaffsubjects/${teacherid.current}`)
        .then(response => {
            if(response.data){
                console.log('response data', response.data)
                setSubjectlist(response.data);
              
                console.log('subjectlist', subjectlist)
                
            }
            else{
                alert('no subjects found');
            }
        })
        .catch(err => {
        console.log(err);
        })
           
    }, [sem]);
 
    const fetchStudentDetails=(event) => {

    }
    const handleInputChange = (event) => {
        const selectedSemester = event.target.value;
        setSem(selectedSemester);

        axios.get(`http://localhost:5000/basicacademic/${rollNumber}`)
            .then(response => {
                if (response.data) {
                    setbasicacademic(response.data);
                } else {
                    setbasicacademic(null);
                    alert('No academic found');
                }
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:5000/getsemestermarks/${rollNumber}/${selectedSemester}`)
            .then(response => {
                if (response.data) {
                    console.log("marks=",response.data);
                    setMarks(response.data);
                    renderChart(response.data);
                } else {
                    setMarks(null);
                    alert('No marks found');
                }
            })
            .catch(err => {
                console.log(err);
            });
           
    };

    const renderChart = (marksData) => {
        const chartData = [['SubjectID', 'Marks Obtained']];
        marksData.forEach((mark) => {
          chartData.push([mark.SubjectID.toString(), mark.MarksObtained]);
        });
      
        return (
          <Chart
            width={'90%'} // Set width to 75% of the screen width
            height={'90%'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              title: 'Marks Obtained',
              chartArea: { width: '75%', height: '70%' }, // Set chart area width to 75%
              hAxis: { 
                title: 'Marks Obtained',
                slantedText: true, // Rotate axis labels
                slantedTextAngle: 90, // Angle for rotated labels
              },
              vAxis: { title: 'SubjectID', minValue: 0 },
            }}
          />
        );
      };
      
    
      const renderGpaChart = (gpaData) => {
        const chartData = [['Semester', 'GPA']];
        gpaData.forEach((gpa) => {
          chartData.push([gpa.semester.toString(), gpa.gpa]);
        });
    
        return (
          <Chart
            width={'90%'}
            height={'90%'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              title: 'GPA',
              chartArea: { width: '50%' },
              hAxis: { title: 'Semester' },
              vAxis: { title: 'GPA', minValue: 6, maxValue: 10, ticks: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] },
            }}
          />
        );
      };
   

    return (
        <>
            <Navbar />
            
          
        <input
                type="number"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={handleInputChange1}
            />
            <button className='add-btn' onClick={fetchStudentDetails}>Search</button>
            <div>
                <label htmlFor="semSelect">Select Semester:</label>
                <select
                    id="semSelect"
                    value={sem || ''}
                    onChange={handleInputChange}
                >
                    <option value="">Select Semester</option>
                    {[...Array(8).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
                <p>Semester: {sem}</p>
            </div>
            <div>
        {marks && renderChart(marks)}
      </div>
      <div>
        {gpa && renderGpaChart(gpa)}
      </div>
      
      
      {!subjectclicked && subjectlist.map((subject, index) => (
        <>
        
    <div onClick={()=>{subjectclick(subject.SubjectId);
    setsubjectclicked(true)
    }} className="view-form" key={index}>
        <p>{subject.SubjectId}</p>
        <p>{subject.SubjectName}</p>
    </div>
    </>
))}
{ subjectclicked &&<button className='delete-btn' onClick={()=>setsubjectclicked(!subjectclicked)}>Back</button>}
{subjectclicked && studentlist && studentlist.map((student, index) => 
     (
        <>
       
            <div className="view-form" key={index}>
                <p>RollNumber:{student.RollNumber}</p>
                <p>Semester:{student.Semester}</p>
                <p>Marks:{student.MarksObtained}</p>
                <p>Grade:{student.Grade}</p>

            </div>
        </>
    )
)}
{subjectclicked && <div>
    <p>Class Average Mark:{statistics.average_mark}</p>
    <p>Maximum Mark:{statistics.max_mark}</p>
    </div>}
  

     
        </>
    )
}

export default Teacheranalytics;
