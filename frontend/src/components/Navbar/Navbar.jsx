import { useState, useEffect } from 'react';
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      setIsLoggedIn(true);
      axios.get('http://127.0.0.1:5000/api/userData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = "/login";
  };

  const renderUserInfo = () => {
    if (isLoggedIn) {
      return (
        <div className="user-info">
          
          {userData && <span onClick={handleLogout}>Hello, {userData.name}</span>}
        </div>
      );
    } else {
      return (
        <div className="user-info">
          <button className="login-button" onClick={() => { window.location.href = "/login"; }}>Login</button>
          <button className="register-button" onClick={() => { window.location.href = "/register"; }}>Register</button>
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <a href="/">Yoga Assist</a>
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/poses">Poses</a>
          <a href="/yogaDetection">Practice</a>
          <Link to='/blogs'>Blogs</Link>
        </div>
        {renderUserInfo()}
      </div>
    </nav>
  );
};

export default Navbar;
