import React from 'react'
import temp from '../images/temp.png';
import SimpleImageSlider from "react-simple-image-slider";


const Header = ({onClick}) => {

  return (
    <div>
        <div className='nav-container'>
            <h1>IST ATTENDANCE PORTAL</h1>
            <ul>
                <li>HOME</li>
                <li onClick={onClick}>SERVICES</li>
            </ul>    
        </div>
        <Image />   
    </div>
  )
}

function Image()  {
    const images = [
        {url: temp},
        {url: "https://kinsta.com/wp-content/uploads/2020/08/media-queries.png"},
        {url: "https://kinsta.com/wp-content/uploads/2020/08/media-queries.png"}
    ];
    const newImages = [];

    return (
        <div style={{display:"flex"}}>
        <div className='image-container'>
            <SimpleImageSlider 
                width={"650px"} 
                height={"435px"} 
                images={images}
                showBullets={true}
                showNavs={true} 
                style={{marginLeft:"auto",marginRight:"auto",marginTop:"7px",transform:`scale(${0.9})`}}
            />
        </div>
        <div className='image-container'>
            Content Space
        </div>
        </div>
    );
}

export default Header