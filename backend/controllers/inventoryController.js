const { db } = require('../firebase');

const getInventory = async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const inventory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addInventoryItem = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newItem = {
      name,
      quantity,
      timestamp: new Date()
    };
    const docRef = await db.collection('inventory').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getInventory,
  addInventoryItem,
};
