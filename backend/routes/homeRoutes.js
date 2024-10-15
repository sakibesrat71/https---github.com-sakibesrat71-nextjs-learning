const express = require('express');
const router = express.Router();
const Me = require('../models/me'); // Import the Mongoose model

// Get the latest created object
router.get('/get-myself', async (req, res) => {
  try {
    console.log('Fetching latest data...');
    const latestMe = await Me.findOne().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    if (latestMe) {
      res.status(200).json(latestMe);
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Create a new meSchema object
router.post('/create-myself', async (req, res) => {
    const { currentlyAm, beenAroundTheBlockOf, about } = req.body;
  
    if (!currentlyAm || !about) {
      return res.status(400).json({ message: 'CurrentlyAm and About are required fields' });
    }
  
    try {
      const newMe = new Me({
        currentlyAm,
        beenAroundTheBlockOf,  // This should be an array of strings
        about,
      });
  
      const savedMe = await newMe.save();
      res.status(201).json({ message: 'New data created', data: savedMe });
    } catch (error) {
      res.status(500).json({ message: 'Error creating data', error });
    }
  });

module.exports = router;
