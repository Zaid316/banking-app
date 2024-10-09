import React, { useState } from 'react';
import axios from 'axios';
import './generateReports.css'; // Ensure your styles are included
import AdminHeader from './adminheader'; 

const GenerateReport = () => {
  const [userId, setUserId] = useState('');
  const [creditScore, setCreditScore] = useState(null);
  const [rejectedLoans, setRejectedLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const fetchUserData = async () => {
    setError('');
    setLoading(true); 
    try {
      const loansResponse = await axios.get(`http://localhost:8080/api/admin/users/${userId}/loans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const rejectedLoans = loansResponse.data.filter(loan => loan.status === 'REJECTED');
      setRejectedLoans(rejectedLoans);

      const transactionsResponse = await axios.get(`http://localhost:8080/api/admin/users/${userId}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setTransactions(transactionsResponse.data);
      
      const score = calculateCreditScore(transactionsResponse.data, rejectedLoans);
      setCreditScore(score);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please check the User ID.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const calculateCreditScore = (transactions, rejectedLoans) => {
    let score = 0;

    // Original criteria for credit score based on transactions
    transactions.forEach((transaction) => {
      if (transaction.transactionType === 'DEPOSIT') {
        score += Math.floor(transaction.amount / 100); // Original criteria
      } else if (transaction.transactionType === 'WITHDRAWAL') {
        score -= Math.floor(transaction.amount / 200); // Original criteria
      } else if (transaction.transactionType === 'TRANSFER') {
        score -= Math.floor(transaction.amount / 150); // Original criteria
      }
    });

    // Original criteria for rejected loans
    rejectedLoans.forEach((loan) => {
      score -= Math.floor(loan.amount / 3000); // Original criteria
    });

    return Math.max(score, 0); // Ensure the score doesn't go below 0
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  // Loan Amount Range and Interest Rate Table
  const loanCriteria = [
    { minScore: 0, maxScore: 50, loanAmount: 'Up to ₹50,000', interestRate: '12%' },
    { minScore: 51, maxScore: 100, loanAmount: '₹50,001 - ₹100,000', interestRate: '10%' },
    { minScore: 101, maxScore: 150, loanAmount: '₹100,001 - ₹200,000', interestRate: '8%' },
    { minScore: 151, maxScore: 200, loanAmount: 'Above ₹200,000', interestRate: '6%' },
  ];

  return (
    <div>
      <AdminHeader />
      <div className="generate-report-container">
        <form onSubmit={handleSearch} className="generate-report-search-form">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="generate-report-search-input"
          />
          <button type="submit" className="generate-report-search-btn">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {/* Loading state */}
        {loading && <p>Loading...</p>}

        {/* Display credit score only after successful search */}
        {creditScore !== null && !loading && (
          <div className="credit-score-result">
            <h2>Credit Score for User : {creditScore}</h2>
            <h3>Loan Amount Range and Interest Rate Based on Credit Score</h3>
            <table className="loan-criteria-table">
              <thead>
                <tr>
                  <th>Credit Score Range</th>
                  <th>Loan Amount</th>
                  <th>Interest Rate</th>
                </tr>
              </thead>
              <tbody>
                {loanCriteria.map((criteria, index) => (
                  <tr key={index}>
                    <td>{criteria.minScore} - {criteria.maxScore}</td>
                    <td>{criteria.loanAmount}</td>
                    <td>{criteria.interestRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateReport;





