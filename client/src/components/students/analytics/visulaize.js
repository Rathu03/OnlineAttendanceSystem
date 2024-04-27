import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import { Chart } from "react-google-charts";

function Visualization() {
  const userRef = useRef(null);
  const [basicacademic, setbasicacademic] = useState(null);
  const [marks, setMarks] = useState(null);
  const [sem, setSem] = useState(null);
  const [gpa, setGpa] = useState(null);
  const [cgpa, setCgpa] = useState(null);

  useEffect(() => {
    userRef.current = localStorage.getItem('rollnumber');
    axios.get(`http://localhost:5000/getgpa/${userRef.current}`)
      .then(response => {
        if (response.data) {
          setGpa(response.data);
          console.log("gpa", response.data);
        } else {
          setGpa(null);
          alert('No GPA found');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [sem]);

  useEffect(() => {
    userRef.current = localStorage.getItem('rollnumber');
    axios.get(`http://localhost:5000/getcgpa/${userRef.current}`)
      .then(response => {
        if (response.data) {
          setCgpa(response.data.cgpa);
          console.log("cgpa is", response.data);
        } else {
          alert('No CGPA found');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (event) => {
    const selectedSemester = event.target.value;
    setSem(selectedSemester);

    axios.get(`http://localhost:5000/basicacademic/${userRef.current}`)
      .then(response => {
        if (response.data) {
          setbasicacademic(response.data);
        } else {
          alert('No academic found');
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`http://localhost:5000/getsemestermarks/${userRef.current}/${selectedSemester}`)
      .then(response => {
        if (response.data) {
          console.log("marks=", response.data);
          setMarks(response.data);
        } else {
          alert('No marks found');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderChart = (marksData) => {
    const chartData = [['SubjectID', 'Marks Obtained', 'Average Mark', 'Maximum Mark']];
    marksData.forEach((mark) => {
      chartData.push([mark.SubjectID.toString(), mark.MarksObtained, mark.AverageMark, mark.MaximumMark]);
    });
  
    return (
      <Chart
        width={'90%'}
        height={'90%'}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Marks Obtained, Average Mark, and Maximum Mark',
          hAxis: { 
            title: 'SubjectID',
            minValue: 0,
          },
          vAxis: { title: 'Values', minValue: 0 },
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
          chartArea: { width: '70%' },
          hAxis: { title: 'Semester' },
          vAxis: { title: 'GPA', minValue: 6, maxValue: 10, ticks: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] },
        }}
      />
    );
  };

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default Visualization;
