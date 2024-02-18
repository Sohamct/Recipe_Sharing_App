const express = require('express');
const User = require('../models/userModel');
const fetchUser = require('../middleware/fetchUser');
const Recipe = require('../models/recipeModel');
const Comment = require('../models/commentModel');
const validateComment = require('../middleware/validateCommentMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();


router.post('/addConnection', [fetchUser], async (req, resp) => {
  console.log('Adding new comment', req.body, req.header);
  try {
      
      // Check if req.user is defined before accessing req.user.id
    if (!req.user) {
        return resp.status(401).json({ message: 'Unauthorized access' });
    }
        
    const user_id = req.body.user_id
   
    try{
        if(user_id == req.body.user._id){
            to = await Recipe.find({ _id: _to });
        }else{
          comment = await Comment.find({_to : recipeId});
        }
    }catch(err){
      return resp.status(401).json({ message: 'Unexpected reply' });
    }
    const userId = req.user.id;

    const comment = await Comment.create({
      text,
      _from : userId,
      repliedTo,
      _to,
    });

    resp.status(200).json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


router.get('/fetchConnections/', fetchUser, async (req, resp) => {
  // console.log('====================fetching Comments=============================================================================', req.headers);
  console.log("Request is comming..................");
  try {
    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user._id;

    const user = await User.find({_id: userId});
    console.log(user);

    const data = {
        followers: user.followers, 
        followings: user.followings
    };

    resp.status(201).json({ message: 'fetched successfully', data: user });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});




module.exports = router;


