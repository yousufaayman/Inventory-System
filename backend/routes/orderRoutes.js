// backend/routes/orderRoutes.js
const express = require('express');
const { getOrders, addOrder, getOrderTransactions, addTransaction } = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', addOrder);
router.get('/orders/:orderId/transactions', getOrderTransactions);
router.post('/orders/:orderId/transactions', addTransaction);

module.exports = router;
