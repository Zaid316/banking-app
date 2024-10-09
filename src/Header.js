import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/santander2.png'; 
import './header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Maverick Bank" className="logo-image" />
          <span>Maverick Bank</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/dashboard">Savings</Link></li>
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/withdraw">Withdraw</Link></li>
          <li><Link to="/transfer">Transfer</Link></li>
          <li><Link to="/loans">Personal Loans</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
        <div className="auth-buttons">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
