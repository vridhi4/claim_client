// Header.js
import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.svg'; 

const Header = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();

    navigate('/login');
};
  return (
    <>
      <div className="header">
      <img src={logo} alt="Logo" className="logo" /> 
      <h1 className='company-name'>Medical Claims Management System</h1>
     
       <button className='logout-button' onClick={handleLogout}>LOGOUT</button>
    
    </div>

  

    </>

  )
};

export default Header;