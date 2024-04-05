import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userData = {
      email: email,
      name: name,
      password: password
    };

    if (email.length === 0) {
      alert("Email is blank");
    } else if (password.length === 0) {
      alert("password is left blank");
    } else {
      axios.post("http://127.0.0.1:5000/api/register", {
        email: email,
        name: name,
        password: password
      })
        .then(function (response) {
          console.log(response);
          navigate('/login');
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
    <div className="register-container">
      <h2>Register</h2>
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
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <button className="register-btn" onClick={handleSubmit}>Register</button>
      <p>Already have an account? <button className="login-btn" onClick={() => { window.location.href = "/login"; }}>Login</button></p>
    </div>
  );
};

export default Register;
