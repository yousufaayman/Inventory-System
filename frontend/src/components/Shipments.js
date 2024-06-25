import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/Shipments.css';

const generateTrackingNumber = () => {
  return 'TRK' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
};

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newShipment, setNewShipment] = useState({
    orderId: '',
    trackingNumber: generateTrackingNumber(),
    status: 'in transit',
    estimatedDelivery: ''
  });

  const fetchShipments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/shipments`);
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddShipment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/shipments`, newShipment);
      fetchShipments();
      setNewShipment({
        orderId: '',
        trackingNumber: generateTrackingNumber(),
        status: 'in transit',
        estimatedDelivery: ''
      });
    } catch (error) {
      console.error('Error adding shipment:', error);
    }
  };

  const handleUpdateStatus = async (shipmentId, status) => {
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/shipments/${shipmentId}`, { status });
      fetchShipments();
    } catch (error) {
      console.error('Error updating shipment status:', error);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchOrders();
  }, []);

  return (
    <div className="shipments-container">
      <h2>Shipments</h2>
      <form onSubmit={handleAddShipment}>
        <label>
          Order ID:
          <select
            value={newShipment.orderId}
            onChange={e => setNewShipment({ ...newShipment, orderId: e.target.value })}
            required
          >
            <option value="">Select Order</option>
            {orders.map(order => (
              <option key={order.id} value={order.id}>{order.id}</option>
            ))}
          </select>
        </label>
        <label>
          Tracking Number:
          <input
            type="text"
            value={newShipment.trackingNumber}
            readOnly
          />
        </label>
        <label>
          Status:
          <select
            value={newShipment.status}
            onChange={e => setNewShipment({ ...newShipment, status: e.target.value })}
          >
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </label>
        <label>
          Estimated Delivery:
          <input
            type="date"
            value={newShipment.estimatedDelivery}
            onChange={e => setNewShipment({ ...newShipment, estimatedDelivery: e.target.value })}
            required
          />
        </label>
        <button type="submit">Add Shipment</button>
      </form>
      <h3>All Shipments</h3>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment.id}>
            <p>Order ID: {shipment.orderId}</p>
            <p>Tracking Number: {shipment.trackingNumber}</p>
            <p>Status: {shipment.status}</p>
            <p>Estimated Delivery: {new Date(shipment.estimatedDelivery.seconds * 1000).toLocaleDateString()}</p>
            <select value={shipment.status} onChange={e => handleUpdateStatus(shipment.id, e.target.value)}>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shipments;
