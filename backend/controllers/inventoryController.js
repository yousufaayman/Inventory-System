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
  const { name, quantity, threshold } = req.body;
  try {
    const newItem = {
      name,
      quantity,
      threshold,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const docRef = await db.collection('inventory').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const checkInventoryAndSetAlerts = async () => {
    try {
      const inventorySnapshot = await db.collection('inventory').get();
      const alertsRef = db.collection('alerts');
  
      inventorySnapshot.forEach(async (doc) => {
        const item = doc.data();
        if (item.quantity <= item.threshold) {
          const alertMessage = `Item ${item.name} has reached its threshold. Quantity: ${item.quantity}`;
          
          // Check if alert already exists
          const existingAlertSnapshot = await alertsRef.where('itemId', '==', doc.id).get();
          if (existingAlertSnapshot.empty) {
            await alertsRef.add({
              itemId: doc.id,
              message: alertMessage,
              createdAt: new Date(),
              status: 'pending',
            });
          }
        }
      });
    } catch (error) {
      console.error('Error checking inventory levels:', error);
    }
  };
  

module.exports = {
  getInventory,
  addInventoryItem,
  checkInventoryAndSetAlerts
};
