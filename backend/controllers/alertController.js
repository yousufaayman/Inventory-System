const { db } = require('../firebase');

const getAlerts = async (req, res) => {
  try {
    const snapshot = await db.collection('alerts').get();
    const alerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAlerts,
};