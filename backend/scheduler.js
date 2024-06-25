const cron = require('node-cron');
const { checkInventoryAndSetAlerts } = require('./controllers/inventoryController');

cron.schedule('0 * * * *', () => {
  console.log('Running scheduled inventory check...');
  checkInventoryAndSetAlerts();
});
