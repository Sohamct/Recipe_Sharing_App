import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeItem } from './RecipeItem/RecipeItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipesAsync } from '../../../features/recipe/Slice/recipe_slice';
import { useProgress } from '../../../features/ProgressContext';

export const RecipeList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipesState = useSelector((state) => state.recipes);
  
  const isOwner = location.pathname === '/myrecipe';
  const {updateProgress}= useProgress();
  console.log(updateProgress);

  const fetchData = useCallback(async () => {
    try {
      await dispatch(fetchRecipesAsync(updateProgress));

      const connectionSpeedMbps = navigator.connection.downlink;

      const timeoutDuration = Math.ceil(1000 / connectionSpeedMbps);

      setTimeout(() => {
        updateProgress(100);
      }, timeoutDuration/30);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  if (recipesState.status === 'loading') {
    return <h3>Loading...</h3>;
  }

  if (recipesState.status === 'failed') {
    return <p>Error: {recipesState.error.fetchError}</p>;
  }

  const recipes = recipesState.recipes || [];
  // console.log(recipes);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5 mb-10">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe._id} recipe = {recipe}/>
      ))}
    </div>
  );
};