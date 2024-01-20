const express = require('express');
const User = require('../models/userModel');
const fetchUser = require('../middleware/fetchUser');
const Recipe = require('../models/recipeModel');
const validateChat = require('../middleware/validateRecipe/');
const { check, validationResult } = require('express-validator');
const { Comment } = require('../models/commentModel');
const router = express.Router();


// Route-1: create a user using: '/api/auth/createrecipe'
router.post('/addChat', [validateChat, fetchUser], async (req, resp) => {
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
    try{
        var to;
        if(req.body.repliedTo == "Recipe"){
            to = await Recipe.find({ _id: req.body.repliedTo });
        }else{
             to = await Comment.find({ _id: req.body.repliedTo });
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




    resp.status(201).json({ message: 'Chat created successfully', data: comment });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


router.get('/fetchComments',  fetchUser, async (req, resp) => {
  console.log('fetching recipes',req.header);
  try {


    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }


    const userId = req.user.id;
    const recipes = await Recipe.find({});
    console.log(recipes)
    resp.status(201).json({ message: 'Recipes fetched successfully', data: recipes });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});


module.exports = router;


