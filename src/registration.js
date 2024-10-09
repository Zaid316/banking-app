import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import logo from './assets/santander black.jpg'; 
import './registration.css';

const phrases = [
  "smarter.",
  "easier.",
  "online."
];

const CustomerRegistration = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    gender: '',
    contactNumber: '',
    address: '',
    dateOfBirth: '',
    aadharNumber: '',
    panNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      setCurrentPhrase(phrases[(currentIndex + 1) % phrases.length]);
    }, 1500); 

    return () => clearInterval(intervalId); 
  }, [currentIndex]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, password, email, gender, contactNumber, address, dateOfBirth, aadharNumber, panNumber } = formData;

    if (!username) newErrors.username = 'Username is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!contactNumber || contactNumber.length !== 10) newErrors.contactNumber = 'Valid contact number (10 digits) is required';
    if (!address) newErrors.address = 'Address is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!aadharNumber || aadharNumber.length !== 12) newErrors.aadharNumber = 'Valid Aadhar number (12 digits) is required';
    if (!panNumber || panNumber.length !== 10) newErrors.panNumber = 'Valid PAN number (10 characters) is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {

        const response = await axios.post('http://localhost:8080/api/auth/signup', formData);

        console.log('Registration successful:', response.data);
        alert('Registration Successful');
        nav("/");
      } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
        alert('Registration Failed: ' + (error.response.data || 'An error occurred'));
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="logo-section">
          <img src={logo} alt="Maverick Bank" className="login-logo" />
          <span className="bank-name">Maverick Bank</span>
        </div>
        <h2 className='register'>Registration Form</h2>

        <div className="input-group">
          <label>Username:</label>
          <input className="registration-input" type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input className="registration-input" type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input className="registration-input" type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Gender:</label>
          <select className="registration-input" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        <div className="input-group">
          <label>Contact Number:</label>
          <input className="registration-input" type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} maxLength="10" />
          {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
        </div>

        <div className="input-group">
          <label>Address:</label>
          <input className="registration-input" type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="input-group">
          <label>Date of Birth:</label>
          <input className="registration-input" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <div className="input-group">
          <label>Aadhar Number:</label>
          <input className="registration-input" type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} maxLength="12" />
          {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
        </div>

        <div className="input-group">
          <label>PAN Number:</label>
          <input className="registration-input" type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} maxLength="10" />
          {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
        </div>

        <button className="registration-button" type="submit">Register</button>
      </form>

      <div className="rotating-text">
        <p>
          Helping people bank <span className="bold-red">{currentPhrase}</span>
        </p>
      </div>
    </div>
  );
};

export default CustomerRegistration;







