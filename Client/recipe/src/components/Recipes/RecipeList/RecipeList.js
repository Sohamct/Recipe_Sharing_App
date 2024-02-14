import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeItem } from './RecipeItem/RecipeItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipesAsync } from '../../../features/recipe/Slice/recipe_slice';

export const RecipeList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipesState = useSelector((state) => state.recipes);
  // Determine isOwner based on the current location
  const isOwner = location.pathname === '/myrecipe';

  // Use useCallback to memoize the function
  const fetchData = useCallback(async () => {
    try {
      await dispatch(fetchRecipesAsync());
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  if (recipesState.status === 'loading') {
    return <h3>Loading...</h3>;
  }

  if (recipesState.status === 'failed') {
    return <p>Error: {recipesState.error.fetchError}</p>;
  }

  const recipes = recipesState.recipes || [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe._id} {...recipe} isOwner={isOwner} />
      ))}
    </div>
  );
};
