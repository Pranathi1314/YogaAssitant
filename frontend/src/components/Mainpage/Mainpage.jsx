import React from 'react';
import './Mainpage.css';
import Navbar from '../Navbar/Navbar';


const Mainpage = () => {
    return (
        <section className='hero'>
         <Navbar/>
        <div className='quoteSection quote'>
            <span>Align,refine</span>
            <span>and let your inner mind shine</span>
        </div>
        <div className='buttonDiv'>
            <button>Explore Poses</button>
            <button>Get Started with Yoga</button>
        </div>
        </section>
     );
}

export default Mainpage;
