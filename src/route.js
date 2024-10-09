import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './login';
import CustomerRegistration from './registration';
import Dashboard from './dashboard';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import Loan from './Loan';
import AdminDashboard from './admindashboard';
import ManageLoans from './manageLoans';
import GenerateReports from './generateReports';
import Footer from './Footer';

const AppRoutes = () => {
  return (
    <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CustomerRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/loans" element={<Loan />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-loans" element={<ManageLoans />} />
        <Route path="/generate-reports" element={<GenerateReports />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
