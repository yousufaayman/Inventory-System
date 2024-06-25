const { db } = require('../firebase');

const generateInventoryReport = async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const inventory = snapshot.docs.map(doc => doc.data());
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const generateOrderReport = async (req, res) => {
  try {
    const snapshot = await db.collection('orders').get();
    const orders = snapshot.docs.map(doc => doc.data());
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const generateReport = async (req, res) => {
  try {
    const inventorySnapshot = await db.collection('inventory').get();
    const orderSnapshot = await db.collection('orders').get();
    
    const inventory = inventorySnapshot.docs.map(doc => doc.data()) || [];
    const orders = orderSnapshot.docs.map(doc => doc.data()) || [];
    
    const report = {
      inventory,
      orders,
      generatedAt: new Date(),
    };
    
    const docRef = await db.collection('reports').add(report);
    res.status(201).json({ id: docRef.id, ...report });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getReports = async (req, res) => {
  try {
    const snapshot = await db.collection('reports').orderBy('generatedAt', 'desc').get();
    const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  generateInventoryReport,
  generateOrderReport,
  generateReport,
  getReports,
};
