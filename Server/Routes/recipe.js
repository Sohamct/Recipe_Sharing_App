const express = require('express');
const User = require('../models/userModel');
const fetchUser = require('../middleware/fetchUser');
const Recipe = require('../models/recipeModel');
const validateRecipe = require('../middleware/validateRecipeMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// Route-1: POST create a user using: '/api/auth/createrecipe'
router.post('/createrecipe', [fetchUser, validateRecipe], async (req, resp) => {
  console.log('Creating new recipe', req.body, req.header);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    
    const { title, description, steps, ingredients } = req.body;

    // Check if req.user is defined before accessing req.user.id
    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }

    const username = req.user.username;
    console.log(username)
    const recipe = await Recipe.create({
      title,
      description,
      steps,
      ingredients,
      owner: username,
    });

    resp.status(201).json({ message: 'Recipe created successfully', data: recipe });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});

router.get('/fetchrecipes',  fetchUser, async (req, resp) => {
  console.log('fetching recipes',req.header);
  try {

    if (!req.user) {
      return resp.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;
    const recipes = await Recipe.find({});
    console.log("fetched all recipes ",recipes)
    resp.status(201).json({ message: 'Recipes fetched successfully', data: recipes });
  } catch (error) {
    console.error(error);
    resp.status(500).send('Unexpected error occurred');
  }
});

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q; // Get the search term from query parameters

    // Use the searchTerm to query your backend data
    const searchResults = await Recipe.find({ title: { $regex: searchTerm, $options: 'i' } });

    res.json({ results: searchResults });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/suggestions', async (req, res) => {
  try {
    const keyword = req.query.q.toLowerCase();

    // Use the searchTerm to query the database for matching recipes
    const matchingRecipes = await Recipe.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { owner: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { 'ingredients.ingredient_name': { $regex: keyword, $options: 'i' } }, // Assuming 'ingredients' is an array of objects with 'ingredient_name' property
        // Add more fields as needed
      ],
    });

    // Extract relevant details for suggestions
    const suggestions = matchingRecipes.map(recipe => ({
      id: recipe.id,
      name: recipe.title,
      owner: recipe.owner,
      description: recipe.description,
      ingredients: recipe.ingredients.map(ingredient => ingredient.ingredient_name), // Extract ingredient names
      // Add more details as needed
    }));

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
