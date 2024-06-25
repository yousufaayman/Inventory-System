import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchOrders = async (status) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        params: { status },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(filterStatus);
  }, [filterStatus]);

  return (
    <div className="order-list-container">
      <h2>Orders</h2>
      <div className="filter-container">
        <label>
          Filter by status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </label>
      </div>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id}, Customer ID: {order.customerId}, Status: {order.status}
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.itemId}: {item.quantity} units at ${item.price} each</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
