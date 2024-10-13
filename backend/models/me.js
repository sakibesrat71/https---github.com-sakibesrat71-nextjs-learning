const mongoose = require('mongoose');

const meSchema = new mongoose.Schema({
  currentlyAm: {
    type: String,
    required: true,
  },
  beenAroundTheBlockOf: [String],
  about:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('myself', meSchema);
