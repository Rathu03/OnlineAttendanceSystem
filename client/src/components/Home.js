import React, { useRef } from 'react'
import Services from './Services';
import Header from './Header';

const Home = () => {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.scrollIntoView({behavior : 'smooth'});
  }

  return (
    <div className='main-body'>
      <Header onClick={handleClick}/>
      <Services ref={ref}/>
    </div>
  )
}

export default Home