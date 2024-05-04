require("dotenv").config();
const express = require('express');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const fetchUser = require('../middleware/fetchUser');
const Recipe = require('../models/recipeModel');
const validateRecipe = require('../middleware/validateRecipeMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { addFavoriteRecipe, removeFavoriteRecipe, checkIfRecipeIsFavorite } = require('../Services/recipeService');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../cloudinary');
const { log } = require("console");
// const Visitor = require('../models/visitorModel');


//  -----------------------------------------------------
// Route-1: POST create a recipe using: '/api/auth/createrecipe'
router.post('/createrecipe', [fetchUser], async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, description, ingredients, category, vegNonVeg, dishType} = req.body;

    console.log(req.body);
    console.log(req.files);
    const result = await cloudinary.uploader.upload( req.files ? req.files.image.tempFilePath : null, {
      folder: "RecipeImages",
    })
    console.log(result.public_id, result.secure_url);
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const username = req.user.username;
    const recipe = await Recipe.create({
      title,
      description,
      ingredients: JSON.parse(ingredients),
      owner: username,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      },
      category: category,
      vegNonVeg: vegNonVeg,
      dishType: dishType,
      createdAt: new Date()

    });

    res.status(201).json({ message: 'Recipe created successfully', data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unexpected error .... occurred');
  }
});

router.put('/editrecipe', [fetchUser], async (req, resp) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }


    const { title, _id, description, ingredients, owner, category, vegNonVeg, dishType} = req.body;


    if (!req.user) {
      return resp.status(401).json({ message: 'You are Unauthorized' });
    }

    const username = req.user.username;
    // console.log(owner, username)
    if (username !== owner) {
      return resp.status(403).json({ message: 'Forbidden: You are not allowed to edit this recipe' });
    }
    // console.log(imagePath);
    let updateObject = { title, description, ingredients: JSON.parse(ingredients), category, vegNonVeg, dishType, updatedAt: new Date() };
    if (req.files && req.files.image) {
      const imagePath = req.files.image.tempFilePath;
      
      const prevRecipe = await Recipe.findOne({_id, owner: username});
      if(prevRecipe.image && prevRecipe.image.public_id){
        const prevPublicId = prevRecipe.image.public_id;
        await cloudinary.uploader.destroy(prevPublicId);
      }

      const result = await cloudinary.uploader.upload( imagePath, {
        folder: "RecipeImages",
      });
      updateObject.image = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }


    const recipe = await Recipe.findOneAndUpdate(
      { _id: _id, owner: username },
      updateObject,
      { new: true } // returning the updated recipe
    );

    if (!recipe) {
      return resp.status(404).json({ message: 'Recipe not found or unauthorized' });
    }


    resp.status(201).json({ message: 'Recipe edited successfully', data: recipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/deleterecipe', [fetchUser], async (req, resp) => {


  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() })
    }

    const { recipeId, owner } = req.body;

    if (!req.user) {
      return resp.status(401).json({ message: 'You are Unauthorized' });
    }

    const username = req.user.username;

    if (username != owner) {
      return resp.status(403).json({ message: 'Forbidden: You are not allowed to delete this recipe' });
    }

    const recipeToDelete = await Recipe.findOne({ _id: recipeId });
    if (!recipeToDelete) {
      return resp.status(404).json({ message: "Recipe not found" });
    }

    if(recipeToDelete.image && recipeToDelete.image.public_id){
      const public_id = recipeToDelete.image.public_id;
      await cloudinary.uploader.destroy(public_id);


    }

    await Comment.deleteMany({ _to: recipeId });

    const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeId });

    if (!deletedRecipe) {
      return resp.status(404).json({ message: "Recipe can not be deleted since it does not exist!" });
    }

    resp.status(200).json({ message: "Recipe deleted successfully!", data: deletedRecipe });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/fetchrecipes', fetchUser, async (req, resp) => {
  try {

    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }

    // const userId = req.user.id;
    const recipes = await Recipe.find({});

    resp.status(201).json({ message: 'Recipes fetched successfully', data: recipes });
  } catch (error) {
    // console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});

router.get('/fetchrecipesbyowner', fetchUser, async (req, resp) => {
  try {
    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }

    const ownerName = req.query.owner; 
    console.log(ownerName);
    
    if (!ownerName) {
      return resp.status(400).json({ message: 'Owner name is required' });
    }

    const recipes = await Recipe.find({ owner: ownerName });

    // console.log(recipes);
    resp.status(201).json({ message: 'Recipes fetched successfully', data: recipes });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});

router.get('/search', async (req, res) => {
  try {
    
    const searchTerm = req.query.q;

    if (!searchTerm || searchTerm.trim() === '') {
      return res.json({ results: [] }); // Return an empty array if searchTerm is not provided or is an empty string
    }

    const searchResults = await Recipe.find({ title: { $regex: searchTerm, $options: 'i' } });

    if (searchResults.length === 0) {
      return res.json({ results: [], message: 'No results found' });
    }


    res.json({ results: searchResults });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/suggestions', async (req, res) => {
  try {
    const keyword = req.query.q.toLowerCase();

    if (keyword.trim() === '') {
      return res.json({ suggestions: [] }); // Return an empty array if keyword is an empty string
    }

    // Use the keyword to query the database for matching recipes
    if (keyword.trim() === '') {
      return res.json({ suggestions: [] }); // Return an empty array if keyword is an empty string
    }

    // Use the keyword to query the database for matching recipes
    const matchingRecipes = await Recipe.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { owner: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { 'ingredients.ingredient_name': { $regex: keyword, $options: 'i' } },
        { 'ingredients.ingredient_name': { $regex: keyword, $options: 'i' } },
      ],
    });

    const suggestions = matchingRecipes
      .filter((recipe) => recipe.title.toLowerCase().startsWith(keyword))
      .map((recipe) => ({
        id: recipe.id,
        name: recipe.title,
        owner: recipe.owner,
        description: recipe.description,
        ingredients: recipe.ingredients.map((ingredient) => ingredient.ingredient_name),
        // Add more details as needed
      }));

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add a favorite recipe for a user
router.post('/addFavorite', fetchUser, async (req, res) => {
  const { userId, recipeId } = req.body;
  // console.log(req.body);

  try {
    console.log(userId, recipeId);
    const user = await addFavoriteRecipe(userId, recipeId);
    res.status(200).json({ user, message: 'Recipe added from the favorites successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to remove a favorite recipe for a user
router.delete('/removeFavorite', fetchUser, async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const user = await removeFavoriteRecipe(userId, recipeId);
    res.status(200).json({ user, message: 'Recipe removed from the favorites successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getFavorites', fetchUser, async (req, res) => {
  try {
      if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
      if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

      const userId = req.user.id; 
      // console.log(userId);
      const user = await User.findById(userId);

      const favoriteRecipeIds = user.favoriteRecipes || [];
      // console.log(favoriteRecipeIds);

      // Fetch the actual recipe details using the favoriteRecipeIds
      const favoriteRecipes = await Recipe.find({ _id: { $in: favoriteRecipeIds } });

      res.status(200).json({ message: 'Favorite recipes fetched successfully', data: favoriteRecipes });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unexpected error occurred' });
      console.error(error);
      res.status(500).json({ error: 'Unexpected error occurred' });
  }
});

router.post('/checkIfRecipeIsFavorite', fetchUser, async (req, res) => {
  const { recipeId } = req.body;


  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;

    // Check if the recipe is marked as a favorite for the user
    const isFavorite = await checkIfRecipeIsFavorite(userId, recipeId);

    // Respond with the result
    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Error checking if recipe is a favorite:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/recipe-details', async (req, resp) => {
//   try{
//     const recipes = await Recipe.find({}, 'ingreddients.quantity_type dishType category vegNonVeg');
//     const result = recipes.map((recipe) => ({
//       ingredients: recipe.ingredients.map((ingredient) => ({
//         quantity_type: ingredient.quantity_type
//       })),
//       dishType: recipe.dishType,
//       category: recipe.category,
//       vegNonVeg: recipe.vegNonVeg
//     }))
//     console.log(result)
//     resp.status(200).json({message: 'Fetched quantity units successfully!', result: result})
//   }catch(error){
//     resp.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// router.post('/addVisitor', [fetchUser], async (req, resp) => {
//   try{
//     await Visitor.create({
//       userId: req.user.id,
//       recipeId : req.body.recipeId
//     })
//   }catch(error){

//   }
// })

module.exports = router;
