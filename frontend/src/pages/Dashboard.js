import React from 'react';
import Inventory from '../components/Inventory';
import Notifications from '../components/Notifications';
import Orders from '../components/Orders';
import Shipments from '../components/Shipments';
import Reports from '../components/Reports';
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
        <div className="inventory-container">
          <Inventory />
        </div>
        <div className="notifications-container">
          <Notifications />
        </div>
        <div className="orders-container">
          <Orders />
        </div>
        <div className="shipments-container">
          <Shipments />
        </div>
        <div className="reports-container">
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
