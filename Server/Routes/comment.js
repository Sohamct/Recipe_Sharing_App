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
      time: new Date(),
    });
    console.log(comment);
    resp.status(200).json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


router.delete('/deleteComment', [fetchUser], async (req, resp) => {
  try {
    const errors = validationResult(req);
    console.log("Helllo deleting comment...............................")
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const { commentId } = req.body;

    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized access' });
    }
    try{
        await Comment.deleteOne({_id : commentId})
    }catch(err){
      return resp.status(401).json({ message: 'Unexpected reply' });
    }
    
    resp.status(200).json({ message: 'Comment deleted successfully', data: {success: true} });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


router.put('/updateComment', [fetchUser], async (req, resp) => {
  try {
    const errors = validationResult(req);
    console.log("Helllo updating comment...............................")
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const { commentId, updatedText } = req.body;

    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized access' });
    }
    console.log(commentId, updatedText)
    try{
       const comment = await Comment.findOneAndUpdate(
          {_id : commentId, _from : req.user.username}, 
          {text: updatedText, updatedAt: new Date()},
          {new : true}
        );
        if (!comment) {
          return resp.status(404).json({ message: 'Comment not found or unauthorized' });
        }
        resp.status(200).json({ message: 'Comment updated successfully', data: comment });
    }catch(err){
      return resp.status(401).json({ message: 'Unexpected reply' });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});



router.get('/fetchComments/:id', fetchUser, async (req, resp) => {
  // console.log("Fetch Request is comming..................");
  try {
    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }
    // console.log(req.params.id)
    const comments = await Comment.find({ _to: req.params.id });
    // console.log(comments);
    resp.status(201).json({ message: 'Comments fetched successfully', data: comments });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


module.exports = router;


