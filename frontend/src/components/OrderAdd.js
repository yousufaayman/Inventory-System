import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/AddOrder.css';

const AddOrder = ({ onOrderAdded }) => {
  const [newOrder, setNewOrder] = useState({ items: [], customerId: '', status: 'processing' });
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ itemId: '', quantity: 0, price: 0 });

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-inventory`);
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, newOrder);
      setNewOrder({ items: [], customerId: '', status: 'processing' });
      onOrderAdded();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleAddItem = () => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      items: [...prevOrder.items, selectedItem],
    }));
    setSelectedItem({ itemId: '', quantity: 0, price: 0 });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="add-order-container">
      <h3>Add New Order</h3>
      <form onSubmit={handleAddOrder}>
        <label>
          Customer ID:
          <input type="text" value={newOrder.customerId} onChange={e => setNewOrder({ ...newOrder, customerId: e.target.value })} required />
        </label>
        <div className="add-item-container">
          <label>
            Item:
            <select value={selectedItem.itemId} onChange={e => {
              const selected = inventory.find(item => item.id === e.target.value);
              setSelectedItem({ ...selectedItem, itemId: selected.id, price: selected.price });
            }}>
              <option value="">Select Item</option>
              {inventory.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input type="number" value={selectedItem.quantity} onChange={e => setSelectedItem({ ...selectedItem, quantity: Number(e.target.value) })} required />
          </label>
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>
        <ul>
          {newOrder.items.map((item, index) => (
            <li key={index}>{item.itemId}: {item.quantity} units at ${item.price} each</li>
          ))}
        </ul>
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default AddOrder;
