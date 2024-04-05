import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    if (email.length === 0) {
      alert("Email is blank");
    } else if (password.length === 0) {
      alert("password is left blank");
    } else {
      axios.post("http://127.0.0.1:5000/api/login", {
        email: email,
        password: password
      })
        .then(function (response) {
          const accessToken = response.data.access_token;
          console.log(response.data.access_token);
          localStorage.setItem('access_token', accessToken);
          navigate('/');
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response && error.response.status === 401) {
            alert("Invalid credentials");
          }
        });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="login-btn" onClick={handleSubmit}>Login</button>
      <p>Don't have an account? <button className="register-btn" onClick={() => { window.location.href = "/register"; }}>Register</button></p>
    </div>
  );
};

export default Login;
