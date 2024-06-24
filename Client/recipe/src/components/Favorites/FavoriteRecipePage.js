import React, { useState, useEffect } from 'react';
import api from '../../app/service/RecipeApi';
import { RecipeItem } from '../Recipes/RecipeList/RecipeItem/RecipeItem';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../features/context';

const FavoriteRecipePage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState(new Array(16).fill(null));
  const [loading, setLoading] = useState(true);
  const {user} = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  // const goBack = () => {
  //   navigate(-1); // Navigate back to the previous page
  // };

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  }, [user, location.pathname, navigate])

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await api.getFavoritesAsync();
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setFavoriteRecipes(data.data);
        } else {
          throw new Error('Failed to fetch favorite recipes');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, []);


  return (
    <div>
    <Navigation/>
    <div className='content-padding'>
        <div>
        {loading ? (
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-4 mx-5 mb-3'>
            {favoriteRecipes.map((recipe, index) => (
              <RecipeItem key={index} {...recipe} />
            ))}
          </div>
        ) : (
          <>
            {favoriteRecipes.length > 0 ? (
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-4 mx-5 mb-3'>
                {favoriteRecipes.map((recipe) => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </div>
            ) : (
              <p className='container ml-8 text-xl text-center'>No Favorite recipe found</p>
            )}
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default FavoriteRecipePage;
