import React from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeItem } from './RecipeItem/RecipeItem';
import { useSelector } from 'react-redux';

export const RecipeList = () => {
  const location = useLocation();

  const recipes =  useSelector((state) => state.recipes)

  // Determine isOwner based on the current location
  const isOwner = location.pathname === '/myrecipe';


  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} {...recipe} isOwner={isOwner} />
      ))}
    </div>
  );
};
