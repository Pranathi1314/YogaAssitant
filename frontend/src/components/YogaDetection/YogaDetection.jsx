import React from 'react';
// import axios from 'axios';
import './YogaDetection.css';
import Navbar from '../Navbar/Navbar';

const YogaDetection = () => {

  return (
    <>
    <Navbar/>
    <div className="container">
       
    <div className="video-container">
      <img
        className="video"
        id="video"
        src="http://127.0.0.1:5000/api/video_feed" // Replace with your backend server URL
        alt="Video Feed"
      />
    </div>
  </div>
  </>
  );
};

export default YogaDetection;
