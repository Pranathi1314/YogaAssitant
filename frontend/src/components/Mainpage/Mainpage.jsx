import React from 'react';
import './Mainpage.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';


const Mainpage = () => {
    return (
        <section className='hero'>
         <Navbar/>
        <div className='quoteSection quote'>
            <span>Align,refine</span>
            <span>and let your inner mind shine</span>
        </div>
        <div className='buttonDiv'>
            <Link to="/poses" className='buttonIndiv'>Explore Poses</Link>
            <Link to="/yogaDetection" className='buttonIndiv'>Get Started with Yoga</Link>
        </div>
        </section>
     );
}

export default Mainpage;
