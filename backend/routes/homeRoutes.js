const express = require('express');
const router = express.Router();
const Me = require('../models/me'); 
const LifeUpdate = require('../models/lifeUpdate'); 

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

  router.get('/life-update', async (req, res) => {
    try {
      // Fetch latest update
      const latestUpdate = await LifeUpdate.findOne().sort({ createdAt: -1 });
      if (!latestUpdate) {
        return res.status(404).json({ message: 'No updates found' });
      }
      res.status(200).json(latestUpdate);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });

  // POST route to create a new life update
router.post('/life-update', async (req, res) => {
  const { update } = req.body;

  // Check if the update is provided
  if (!update) {
    return res.status(400).json({ message: 'Update content is required' });
  }

  // Split the update string by spaces to count the number of words
  const wordCount = update.trim().split(/\s+/).length;

  // Check if the word count exceeds 120
  if (wordCount > 120) {
    return res.status(400).json({ message: 'Update cannot exceed 120 words' });
  }

  try {
    // Create a new life update
    const newLifeUpdate = new LifeUpdate({ update });
    await newLifeUpdate.save();
    res.status(201).json(newLifeUpdate);
  } catch (err) {
    res.status(500).json({ message: 'Error creating update', error: err });
  }
});



module.exports = router;
