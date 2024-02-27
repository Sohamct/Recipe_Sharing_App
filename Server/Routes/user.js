const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const fetchUser = require('../middleware/fetchUser');

// Endpoint to handle the /api/user/details route
router.get('/details', fetchUser, async (req, res) => {
  try {
    
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user data 
    return res.json({ success : true, user : user});
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
