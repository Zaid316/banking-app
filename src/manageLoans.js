import React, { useState } from 'react';
import axios from 'axios';
import './manageloans.css'; 
import AdminHeader from './adminheader'; 

const ManageLoans = () => {
  const [userId, setUserId] = useState('');
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(false); 


  const checkUserExists = async () => {
    try {
      await axios.get(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserExists(true);
      return true; 
    } catch (err) {
      setUserExists(false);
      setError('User does not exist.'); 
      return false; 
    }
  };

 
  const fetchPendingLoans = async () => {
    setError('');

    const userExists = await checkUserExists(); 

    if (userExists) {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/users/${userId}/loans`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

    
        const pendingLoans = response.data.filter((loan) => loan.status === 'PENDING');
        setLoans(pendingLoans);

        if (pendingLoans.length === 0) {
          setError('No new loans applied :)'); 
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch loans. Please check the User ID.');
      }
    }
  };

  // Handle the approve or reject functionality
  const handleLoanAction = async (loanId, action) => {
    try {
      const endpoint = action === 'approve' 
        ? `http://localhost:8080/api/admin/loans/approve/${loanId}` 
        : `http://localhost:8080/api/admin/loans/reject/${loanId}`;

      await axios.put(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

     
      fetchPendingLoans();
    } catch (err) {
      console.error(err);
      setError('Failed to update the loan status.');
    }
  };

 
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPendingLoans();
  };

  return (
    <div>
      <AdminHeader />
      <div className="manage-loans-container">
        <form onSubmit={handleSearch} className="manage-loans-search-form">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="manage-loans-search-input"
          />
          <button type="submit" className="manage-loans-search-btn">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {loans.length > 0 ? (
          <table className="manage-loans-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Interest Rate</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{`₹${loan.amount}`}</td>
                  <td>{`${loan.interestRate}%`}</td>
                  <td>{new Date(loan.applicationDate).toLocaleDateString()}</td>
                  <td>{loan.status}</td>
                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleLoanAction(loan.id, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleLoanAction(loan.id, 'reject')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          null 
        )}
      </div>
    </div>
  );
};

export default ManageLoans;



