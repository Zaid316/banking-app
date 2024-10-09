import React, { useState } from 'react';
import axios from 'axios';
import AdminHeader from './adminheader'; 
import './admindashboard.css'; 

const AdminDashboard = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [showTransactions, setShowTransactions] = useState(false);


  const fetchUserDetails = async () => {
    setError('');
    try {
      const userResponse = await axios.get(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(userResponse.data);

      const transactionsResponse = await axios.get(`http://localhost:8080/api/admin/users/${userId}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(transactionsResponse.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user details. Please check the User ID.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUserDetails();
  };

  const toggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  const deleteCustomer = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/customers/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(null);
      setTransactions([]);
      alert('Customer deleted successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to delete customer.');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminHeader /> 
      
      <form onSubmit={handleSearch} className="admin-dashboard-search-form">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="admin-dashboard-search-input"
        />
        <button type="submit" className="admin-dashboard-search-btn">Search</button>
      </form>

      {error && <p className="admin-dashboard-error-message">{error}</p>}

      {user && (
        <div className="admin-dashboard-user-details">
          <h2>User Details</h2>
          <table className="admin-dashboard-account-table">
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
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.accountType}</td>
                <td>{user.balance}</td>
                <td>
                  <button className="admin-dashboard-form-btn" onClick={toggleTransactions}>
                    {showTransactions ? 'Hide Statement' : 'View Statement'}
                  </button>
                  <button className="admin-dashboard-delete-btn" onClick={deleteCustomer}>
                    Delete Customer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {showTransactions && (
            <>
              <h2 className="admin-dashboard-transaction-header">Transaction History</h2>
              {transactions.length > 0 ? (
                <table className="admin-dashboard-transaction-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{`₹${transaction.amount}`}</td>
                        <td>{transaction.status}</td>
                        <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No transactions found :(</p> 
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

