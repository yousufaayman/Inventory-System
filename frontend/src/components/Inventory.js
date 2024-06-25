import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/Inventory.css';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-inventory`);
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="inventory-container">
      <h2>Inventory Levels</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>{item.name}: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
