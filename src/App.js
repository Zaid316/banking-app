import React from 'react';
import './App.css';
import logo from './assets/santander2.png';
import picture from './assets/nadal2.webp';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Maverick Bank" className="logo-image" />
            <span>Maverick Bank</span>
          </div>
          <ul className="nav-links">
  <li><Link to="/login">Savings</Link></li>
  <li><Link to="/login">Deposit</Link></li>
  <li><Link to="/login">Withdraw</Link></li>
  <li><Link to="/login">Personal Loans</Link></li>
  <li><Link to="/about-us">About Us</Link></li>
</ul>
          <div className="auth-buttons">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-text">
            <h1>
              <span className="lato-bold underline-hover">Prosperity</span> <br />
              <span className="lato-bold">is a long game.</span>
            </h1>
            <h2 className="lato-light" style={{ color: '#666' }}>
              Bank on the right <br /> partner.
            </h2>
            <p className="lato-thin">
              Maverick Bank is here to support you with the best financial tools and services to help you achieve your goals, whether personal or professional.
            </p>
            <div className="auth-buttons">
              <Link to="/register">
                <button className="join-us-btn">Join Us →</button>
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <img 
              src={picture}
              alt="Nadal" 
              className="hero-image" 
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;





