const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const auth = require('./routes/authenticator');
const cors = require('cors'); 
const connectDb = require('./utils/connectDb');

dotenv.config(); // Load env variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Use contact route
app.use('/api/contact', contactRoutes);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;
connectDb();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
