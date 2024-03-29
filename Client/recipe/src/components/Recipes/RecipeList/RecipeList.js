

import React, { useEffect, useCallback, useContext } from 'react';
import { RecipeItem } from './RecipeItem/RecipeItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipesAsync } from '../../../features/recipe/Slice/recipe_slice';
import { useProgress } from '../../../features/ProgressContext';
import { FilterContext } from '../../../features/FilterContext';
import { useLocation } from 'react-router-dom';


export const RecipeList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipesState = useSelector((state) => state.recipes);

  const {updateProgress}= useProgress();
  const {filterData} = useContext(FilterContext);


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
  
  useEffect(() => {
  }, [filterData])

  if (recipesState.status === 'loading') {
    return <h3>Loading...</h3>;
  }
  // console.log(filterData);
  if (recipesState.status === 'failed') {
    return <p>Error: {recipesState.error.fetchError}</p>;
  }

  // const recipes = recipesState.recipes || [];
  // console.log(recipesState.recipes);
  const filteredRecipes = recipesState.recipes.filter(recipe => {
    if (

      (filterData.vegNonVeg !== 'Both' && filterData.vegNonVeg && recipe.vegNonVeg !== filterData.vegNonVeg) ||
      (filterData.dishTypes.length > 0 && !filterData.dishTypes.includes(recipe.dishType)) ||
      (filterData.categories.length > 0 && !filterData.categories.includes(recipe.category))
    ) {
      return false; 
    }
    return true;
  }).sort((a, b) => {
    if(filterData.favoritism === "high to low"){
      return b.favorites.length - a.favorites.length;
    }else if(filterData.favoritism === "low to high"){
      return a.favorites.length - b.favorites.length;
    }else{
      return 0;
    }
  })
  // console.log(recipes);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5 mb-10">
      {filteredRecipes.map((recipe) => (
        <RecipeItem key={recipe._id} {...recipe}/>
      ))}
    </div>
  );
};