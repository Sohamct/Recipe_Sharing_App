import React from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeItem } from './RecipeItem.js/RecipeItem';

export const RecipeList = () => {
  const location = useLocation();

  // Determine isOwner based on the current location
  const isOwner = location.pathname === '/myrecipe';

  // Assuming you have an array of recipes, you can map over them
  const recipes = [
    { id: 1, title: 'Recipe 1' },
    { id: 2, title: 'Recipe 2' },
    { id: 3, title: 'Recipe 3' },
    // ... add more recipes as needed
  ];

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} {...recipe} isOwner={isOwner} />
      ))}
    </div>
  );
};
