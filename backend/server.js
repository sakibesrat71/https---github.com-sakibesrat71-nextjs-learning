const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config(); // Load env variables

const app = express();

// Middleware
app.use(bodyParser.json());

// Use contact route
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
