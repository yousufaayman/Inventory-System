const express = require('express');
const { getShipments, addShipment, updateShipmentStatus } = require('../controllers/shipmentController');

const router = express.Router();

router.get('/shipments', getShipments);
router.post('/shipments', addShipment);
router.patch('/shipments/:shipmentId', updateShipmentStatus);

module.exports = router;
