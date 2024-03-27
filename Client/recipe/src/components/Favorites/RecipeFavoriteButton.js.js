import React, { useState, useEffect } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../app/service/RecipeApi';
import { toast } from 'react-toastify';
import { useUser } from '../../features/UserContext';

const RecipeFavoriteButton = ({ recipeId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const {user} = useUser();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await api.checkIfRecipeIsFavoriteAsync(recipeId);
        console.log(response.isFavorite);
        setIsFavorite(response.isFavorite);
      } catch (error) {
        console.error('Error fetching favorite status:', error.message);
      }
    };

    const fetchRecipeDetails = async () => {
      try {
        const response = await api.fetchRecipesAsync();
        const recipeDetails = response.data;

        const foundRecipe = recipeDetails.find((recipe) => recipe._id === recipeId);
        if (foundRecipe) {
          setRecipeTitle(foundRecipe.title);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error.message);
      }
    };

    fetchFavoriteStatus();
    fetchRecipeDetails();
  }, [recipeId]);

    const handleFavoriteClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Not authenticated
        toast.error('Please login to manage favorites.');
        return;
      }
  
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
  
      localStorage.setItem(`recipe_${recipeId}_favorite`, newFavoriteStatus.toString());
  
      if (!isFavorite) {
        console.log(user);
        await api.addFavoriteAsync(user.id, recipeId);
        console.log("added to favourite");
        toast.success(`${recipeTitle} added to favorites!`);

      } else {
        await api.removeFavoriteAsync(user.id, recipeId);
        console.log("removed from favourite");
        toast.info(`${recipeTitle} removed from favorites.`);
      }
    } catch (error) {
      console.error('Failed to add/remove recipe from favorites:', error.message);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  return (
    <div className='mx-0 mt-0.5 p-0 bg-center' onClick={handleFavoriteClick}>
      {isFavorite ? <StarIcon color='warning' /> : <StarBorderIcon color='warning' />}
    </div>
  );
};

export default RecipeFavoriteButton;
