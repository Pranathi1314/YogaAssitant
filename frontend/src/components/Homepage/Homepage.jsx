import { useEffect, useState } from 'react'
import React  from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // useEffect(() => {
  //   const token = localStorage.getItem('access_token')

  //   if(token){
  //     setIsLoggedIn(true);
  //     axios.get('http://127.0.0.1:5000/api/userData',{
  //       headers:{
  //         Authorization:`Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       setUserData(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  //   }
  // },[])

  return (
    <div>
      <Navbar/>

    </div>
  )
}

export default Homepage