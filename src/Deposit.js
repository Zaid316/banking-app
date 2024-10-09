import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './transaction-form.css';
import Header from './Header';

function Deposit() {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/api/transactions/deposit/${userId}`, 
        { amount, userId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setAmount('');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error during deposit:", error);
      alert("Deposit failed. Please check the amount or your account.");
    }
  };

  return (
    <div>
      <Header />
      <div className="transaction-form">
        <h2>Deposit Money</h2>
        <form onSubmit={handleDeposit}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit" className="form-btn">Deposit</button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;












