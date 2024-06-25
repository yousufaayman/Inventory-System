import React from 'react';
import Inventory from '../components/Inventory';
import Notifications from '../components/Notifications';
import { useAuth } from '../components/useAuth';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
      <div className="dashboard-content">
        <Inventory />
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;
