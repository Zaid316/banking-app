import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/santander2.png'; 
import './header.css'; 

const AdminHeader = () => {
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
          <li><Link to="/admin-dashboard">Dashboard</Link></li>
          <li><Link to="/admin/manage-loans">Manage Loans</Link></li>
          <li><Link to="/generate-reports">Generate Reports</Link></li>
        </ul>
        <div className="auth-buttons">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;

