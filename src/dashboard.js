import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';
import Header from './Header'; 

function Dashboard() {
  const [showTransactions, setShowTransactions] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/current", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAccountData(response.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/transactions/users/${userId}/transactions`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTransactions(response.data.slice(-5)); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchAccountData();
    fetchTransactions();
  }, []);

  if (!accountData) {
    return <div>Loading account data...</div>;
  }

  return (
    <div className="Dashboard">
      <Header/> 
      <main>
        <section className="dashboard-section">
          <h2>Account Overview</h2>
          <table className="account-table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Customer Username</th>
                <th>Account Type</th>
                <th>Account Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{accountData.id}</td>
                <td>{accountData.name}</td>
                <td>{accountData.accountType}</td>
                <td>{`₹${accountData.balance}`}</td>
                <td>
                  <button 
                    className="view-statement-btn"
                    onClick={() => setShowTransactions(!showTransactions)}
                  >
                    {showTransactions ? 'Hide Account Statement' : 'View Account Statement'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {showTransactions && (
            <div className="transaction-history">
              <h3>Transaction History</h3>
              <ul>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <li key={transaction.id}>
                      {new Date(transaction.createdAt).toLocaleString()}: {transaction.transactionType} of ₹{transaction.amount}
                    </li>
                  ))
                ) : (
                  <li>No transactions found.</li>
                )}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;


















