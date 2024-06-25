const express = require('express');
const { generateInventoryReport, generateOrderReport, generateReport, getReports } = require('../controllers/reportController');

const router = express.Router();

router.get('/reports/inventory', generateInventoryReport);
router.get('/reports/orders', generateOrderReport);
router.post('/reports', generateReport);
router.get('/reports', getReports);

module.exports = router;
