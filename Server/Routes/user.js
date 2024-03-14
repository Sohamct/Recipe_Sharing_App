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

router.put('/follow', fetchUser, async (req, res) => {
  try {
    const { userIdToFollow } = req.body;

    if (!userIdToFollow) {
      return res.status(400).json({ error: "userIdToFollow is required" });
    }

    // Check if the user to follow exists
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ error: "User to follow not found" });
    }

    // console.log(req.user);
    // Check if the logged-in user exists and has a 'followings' property
    if (!req.user || !req.user.followings) {
      return res.status(500).json({ error: "Invalid user object in request" });
    }

    // Check if the user is already following the target user
    if (req.user.followings.includes(userIdToFollow)) {
      return res.status(400).json({ error: "You are already following this user" });
    }

    // Update the follower list for the target user
    await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: req.user._id } });

    // Update the following list for the logged-in user
    await User.findByIdAndUpdate(req.user._id, { $push: { followings: userIdToFollow } });

    res.json({ message: "Successfully followed the user" });
  } catch (error) {
    console.error("Error:", error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: "User to follow not found" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/unfollow', fetchUser, async (req, res) => {
  try {
    const { userIdToUnfollow } = req.body;

    if (!userIdToUnfollow) {
      return res.status(400).json({ error: "userIdToUnfollow is required in the request body" });
    }

    // Check if the user to unfollow exists
    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({ error: "User to unfollow not found" });
    }

    // Check if the logged-in user exists and has a 'followings' property
    if (!req.user || !req.user.followings) {
      return res.status(500).json({ error: "Invalid user object in the request" });
    }

    // Check if the user is currently following the target user
    if (!req.user.followings.includes(userIdToUnfollow)) {
      return res.status(400).json({ error: "You are not currently following this user" });
    }

    // Remove the target user from the follower list
    await User.findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: req.user._id } });

    // Remove the target user from the following list for the logged-in user
    await User.findByIdAndUpdate(req.user._id, { $pull: { followings: userIdToUnfollow } });

    res.json({ message: "Successfully unfollowed the user" });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ error: "User to unfollow not found" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
