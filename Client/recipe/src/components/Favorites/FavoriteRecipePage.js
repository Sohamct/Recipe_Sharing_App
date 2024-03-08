import React, { useState, useEffect } from 'react';
import api from '../../app/service/RecipeApi';
import { RecipeItem } from '../Recipes/RecipeList/RecipeItem/RecipeItem';
import { useNavigate } from 'react-router-dom';

const FavoriteRecipePage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await api.getFavoritesAsync();

        if (response.ok) {
          const data = await response.json();
          setFavoriteRecipes(data.data);
        } else {
          throw new Error('Failed to fetch favorite recipes');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  return (
    <div className='p-4 m-auto'>
      <div className='flex items-center mx-4 pl-9 mb-3'>
        <h2> <span className='text-3.5xl bg-center'>&#x2BAB;</span> Your Favorite Recipes  :</h2>
        <button
          className='ml-auto mr-6 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
      <hr />
      
      <div>
        {loading ? (
          <p className='bg-center text-center text-base'>Loading favorite recipes...</p>
        ) : favoriteRecipes.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5'>
            {favoriteRecipes.map((recipe) => (
              <RecipeItem key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p>No favorite recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipePage;
