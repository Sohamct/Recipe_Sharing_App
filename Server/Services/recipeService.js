const User = require('../models/userModel')
const Recipe = require('../models/recipeModel');

async function addFavoriteRecipe(userId, recipeId) {
  try {
    //updating the user document to add the recipeId to the fav list array
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { favoriteRecipes: recipeId } }, { new: true });
    
    //updating the recipes document to add the userId to the fav list array
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $addToSet: { favorites: userId } },
      { new: true, omitUndefined: true, fields: { updatedAt: 0 } }
    );
    
    return {user, recipe};
  } catch (error) {
    console.error('Error adding recipe to favorites:', error.message);
    throw new Error('Failed to add recipe to favorites.');
  }
}

async function removeFavoriteRecipe(userId, recipeId) {
  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { favoriteRecipes: recipeId } }, { new: true });
    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      { $pull: { favorites: userId } },
      { new: true, omitUndefined: true, fields: { updatedAt: 0 } }
    );
    console.log("Removed recipe", recipe);
    return {user, recipe};
  } catch (error) {
    console.error('Error removing recipe from favorites:', error.message);
    throw new Error('Failed to remove recipe from favorites.');
  }
}

async function checkIfRecipeIsFavorite(userId, recipeId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isFavorite = user.favoriteRecipes.includes(recipeId);
    return isFavorite;
  } catch (error) {
    console.error('Error checking if recipe is a favorite:', error.message);
    throw new Error('Failed to check if recipe is a favorite.');
  }
}

module.exports = {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  checkIfRecipeIsFavorite
};
