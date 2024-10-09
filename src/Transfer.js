import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './transaction-form.css';
import Header from './Header';

function Transfer() {
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    const userId = localStorage.getItem('userId');

    try {
      await axios.post(`http://localhost:8080/api/transactions/transfer/${userId}`, {
        sourceUserId: userId,
        targetUserId: toAccount,
        amount,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAmount('');
      setToAccount('');
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during transfer:", error);
      setError('An error occurred during transfer.');
    }
  };

  return (
    <div>
      <Header />
    <div className="transaction-form">
      <h2>Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter recipient account ID"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          required
        />
        <button type="submit" className="form-btn">Transfer</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
}

export default Transfer;




