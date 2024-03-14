const express = require('express');
const User = require('../models/userModel');
const fetchUser = require('../middleware/fetchUser');
const Recipe = require('../models/recipeModel');
const Comment = require('../models/commentModel');
const validateComment = require('../middleware/validateCommentMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();


// Route-1: create a user using: '/api/comment/addComment'
router.post('/addComment', [fetchUser, validateComment], async (req, resp) => {
  console.log('Adding new comment', req.body, req.header);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
   
    const { text, repliedTo, _to } = req.body;

    // Check if req.user is defined before accessing req.user.id
    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized access' });
    }
    const recipeId = req.params.id;
    try{
        if(repliedTo == "recipe"){
            to = await Recipe.find({ _id: _to });
        }else{
          comment = await Comment.find({_to : recipeId});
        }
    }catch(err){
      return resp.status(401).json({ message: 'Unexpected reply' });
    }
    const username = req.user.username;
    console.log("Username..................", req.user)
    const comment = await Comment.create({
      text,
      _from : username,
      repliedTo,
      _to,
    });
    console.log("comment created: ",comment);
    resp.status(200).json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


router.get('/fetchComments/:id', fetchUser, async (req, resp) => {
  console.log("Fetch Request is comming..................");
  try {
    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }
    console.log(req.params.id)
    const comments = await Comment.find({ _to: req.params.id });
    console.log(comments);
    resp.status(201).json({ message: 'Comments fetched successfully', data: comments });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


module.exports = router;


