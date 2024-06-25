// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/Notifications.css';

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/alerts`);
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifications-container">
      <h2>Stock Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <li key={alert.id}>
            {alert.message} - {new Date(alert.createdAt.seconds * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
