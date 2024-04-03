import React from 'react'
import temp from '../components/images/temp.png'
import image2 from '../components/images/image2.png'
import image3 from '../components/images/image3.png'
import SimpleImageSlider from "react-simple-image-slider";


const Header = ({onClick}) => {

  return (
    <div>
        <div className='nav-container'>
            <h1>ATTENDANCE PORTAL</h1>
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
        {url: image3},
        {url: image2}
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