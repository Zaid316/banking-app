import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './transaction-form.css';
import Header from './Header'; 

function Withdraw() {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      await axios.post(`http://localhost:8080/api/transactions/withdraw/${userId}`, { amount }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAmount('');
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  return (
    <div>
      <Header/>
    <div className="transaction-form">
      <h2>Withdraw Money</h2>
      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="form-btn">Withdraw</button>
      </form>
    </div>
    </div>
  );
}

export default Withdraw;







