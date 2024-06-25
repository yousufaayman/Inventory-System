const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { loginUser } = require('./controllers/authController');
const { getInventory, addInventoryItem } = require('./controllers/inventoryController');
const { getAlerts } = require('./controllers/alertController');

require('./scheduler');
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

app.get('/alerts', getAlerts);
app.post('/login', loginUser);
app.get('/get-inventory', getInventory);
app.post('/add-inventory', addInventoryItem);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
