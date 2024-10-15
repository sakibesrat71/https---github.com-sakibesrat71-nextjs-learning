const mongoose = require('mongoose');

// Define the Life Update Schema
const lifeUpdateSchema = new mongoose.Schema({
  update: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model
module.exports = mongoose.model('LifeUpdate', lifeUpdateSchema);
