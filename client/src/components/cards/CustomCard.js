// CustomCard.js

import React from 'react';
import './CustomCard.css';

const CustomCard = ({type, details, onClick }) => {
    console.log(__dirname)
    return (
    <>
    {type==='internship' && <div className="custom-card" onClick={onClick}>
            {type==='internship' && <div>
                <center><h2 className='card-heading'>INTERNSHIP AT {details.employer_name}</h2></center>
            </div>}

            <div className='card-personal'>
                <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
                <div className='card-personal-text'>
                    <p>Name : {details.Name}</p>
                    <p>Reg No : {details.roll_number}</p>
                    <p>Mobile : {details.Phone}</p>
                </div>
            </div>

            <div className="card-content">
            <h3 className="card-title">Stipend : {details.ctc}</h3>
            <h3 className="card-title">Duration : {details.InternshipDuration}</h3>
            </div>

        </div>}
    </>

  );
};

export default CustomCard;
