import React from 'react';
import OrderList from './OrderList';
import AddOrder from './OrderAdd';
import '../assets/styles/Orders.css';

const Orders = () => {

  return (
    <div className="orders-container">
      <h1>Manage Orders</h1>
      <OrderList />
      <AddOrder/>
    </div>
  );
};

export default Orders;
