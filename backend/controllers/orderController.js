// backend/controllers/orderController.js
const { db } = require('../firebase');

const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let query = db.collection('orders');

    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addOrder = async (req, res) => {
  const { items, customerId, status } = req.body;
  try {
    const newOrder = {
      items,
      customerId,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await db.collection('orders').add(newOrder);
    res.status(201).json({ id: docRef.id, ...newOrder });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOrderTransactions = async (req, res) => {
  const { orderId } = req.params;
  try {
    const snapshot = await db.collection(`orders/${orderId}/transactions`).get();
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addTransaction = async (req, res) => {
  const { orderId } = req.params;
  const { amount, method, status } = req.body;
  try {
    const newTransaction = {
      amount,
      method,
      status,
      createdAt: new Date(),
    };
    const docRef = await db.collection(`orders/${orderId}/transactions`).add(newTransaction);
    res.status(201).json({ id: docRef.id, ...newTransaction });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getOrders,
  addOrder,
  getOrderTransactions,
  addTransaction,
};
