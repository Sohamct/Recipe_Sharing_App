import React, { useState, useEffect } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import api from '../../app/service/RecipeApi';
import { fetchUserDetails } from '../../app/service/userApi';


const RecipeFavoriteButton = ({ recipeId }) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        if (!localStorage.getItem('token')) {
          // Handle case where the user is not authenticated
          return;
        }

        // Fetch the latest favorite status when the component mounts
        const response = await api.checkIfRecipeIsFavoriteAsync(recipeId);
        setIsFavorite(response.isFavorite);
      } catch (error) {
        console.error('Error fetching favorite status:', error.message);
      }
    };

    const getUserData = async () => {
      const userData = await fetchUserDetails();
      setUserData(userData);
      const userId = userData.user.id;
      setUserId(userId);

    }

    fetchFavoriteStatus();
    getUserData();
  }, [recipeId]);



  const handleFavoriteClick = async () => {
    try {
      if (!localStorage.getItem('token')) {
        // Handle the case where the user is not authenticated
        return;
      }

      // Toggle the favorite status on the client side
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);

      // Update localStorage with the new favorite status
      localStorage.setItem(`recipe_${recipeId}_favorite`, newFavoriteStatus ? 'true' : 'false');

      // Send a request to add or remove the recipe from favorites
      if (!isFavorite) {
        await api.addFavoriteAsync(userId, recipeId);
        console.log('added to list');
      } else {
        await api.removeFavoriteAsync(userId, recipeId);
        console.log('removed from the list');
      }
    } catch (error) {
      console.error('Failed to add/remove recipe from favorites:', error.message);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  // Check localStorage for the initial favorite status
  useEffect(() => {
    const storedFavoriteStatus = localStorage.getItem(`recipe_${recipeId}_favorite`);
    if (storedFavoriteStatus) {
      setIsFavorite(storedFavoriteStatus === 'true');
    }
  }, [recipeId]);

  return (
    <div className='mx-0 mt-0.5 p-0 bg-center' onClick={handleFavoriteClick}>
      {isFavorite ? <StarIcon color='warning' /> : <StarBorderIcon color='warning' />}
    </div>
  );
};

export default RecipeFavoriteButton;
