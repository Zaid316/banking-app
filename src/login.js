import React, { useState } from 'react';
import bankLogo from './assets/santander black.jpg';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import './login.css';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); 

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const { jwt, userId, userRole } = response.data; 

      localStorage.setItem('token', jwt);
      localStorage.setItem('userId', userId); 


      if (userRole === 'ADMIN') {
        navigate('/admin-dashboard'); 
      } else if (userRole === 'BANKEMPLOYEE') {
        navigate('/bank-employee-dashboard'); 
      } else {
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid email or password'); // Use a message if available
      } else {
        setError('An error occurred during login');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-section">
          <img src={bankLogo} alt="Maverick Bank Logo" className="login-logo" />
          <h2 className="bank-name">Maverick Bank</h2>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="EMAIL"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">LOGIN</button>
          {error && <p className="error-message">{error}</p>}
          <p className="paragraph">
            Not a member yet? <Link className="link" to="/register">Join us</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;










