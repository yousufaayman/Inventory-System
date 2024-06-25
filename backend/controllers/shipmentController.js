const { db } = require('../firebase');

const getShipments = async (req, res) => {
  try {
    const snapshot = await db.collection('shipments').get();
    const shipments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addShipment = async (req, res) => {
  const { orderId, trackingNumber, status, estimatedDelivery } = req.body;
  try {
    const newShipment = {
      orderId,
      trackingNumber,
      status,
      estimatedDelivery,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await db.collection('shipments').add(newShipment);
    res.status(201).json({ id: docRef.id, ...newShipment });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateShipmentStatus = async (req, res) => {
  const { shipmentId } = req.params;
  const { status } = req.body;
  try {
    const shipmentRef = db.collection('shipments').doc(shipmentId);
    await shipmentRef.update({
      status,
      updatedAt: new Date(),
    });
    res.status(200).send('Shipment status updated');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getShipments,
  addShipment,
  updateShipmentStatus,
};
