import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loan-form.css';
import Header from './Header';

function Loan() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loans, setLoans] = useState([]); // State for loan history
  const [showLoans, setShowLoans] = useState(false); // Toggle loan history
  const navigate = useNavigate();

  const handleLoanApplication = async (e) => {
    e.preventDefault();

    const loanData = {
      amount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      customerId: localStorage.getItem('userId'),
    };

    try {
      await axios.post('http://localhost:8080/api/loans/request', loanData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setLoanAmount('');
      setInterestRate('');
      fetchLoans(); // Refresh loan history after applying
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during loan application:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/loans/users/${userId}/loans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const recentLoans = response.data.slice(-5); 
      setLoans(recentLoans);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  useEffect(() => {
    fetchLoans(); // Fetch loan history on component mount
  }, []);

  return (
    <div>
      <Header />
      <div className="loan-form">
        <h2>Apply for a Loan</h2>
        <form onSubmit={handleLoanApplication}>
          <label>Loan Amount</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
          <label>Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
          />

          <button type="submit" className="form-btn">Apply</button>
          
          {/* Loan History Button inside the form */}
          <button
            type="button"
            className="form-btn"
            onClick={() => setShowLoans(!showLoans)}
          >
            {showLoans ? 'Hide Recent Loan Applications' : 'View Recent Loan Applications'}
          </button>
        </form>
      </div>

      {/* Loan History Table */}
      {showLoans && (
        <div className="loan-details">
          <h3 style={{ marginBottom: '20px' }}>Recent Loan Applications</h3> {/* Add space between heading and table */}
          {loans.length > 0 ? (
            <table className="loan-table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Amount</th>
                  <th>Interest Rate (%)</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{loan.amount}</td>
                    <td>{loan.interestRate}</td>
                    <td>{loan.status}</td>
                    <td>{new Date(loan.applicationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No loan applications found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Loan;













