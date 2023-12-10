import React from 'react';
import { RecipeList } from './RecipeList/RecipeList';
import { FilterRecipe } from './FilterRecipe/FilterRecipe';
import { RecipeShow } from './RecipeList/RecipeItem.js/RecipeShow';

export const Recipes = () => {
  return (
    <div className="container">
      <FilterRecipe/>
      <div className="row">
        <div className="col-md-6">
          <RecipeList />
        </div>
        <div className="col-md-6">
        <RecipeShow/>
        </div>
      </div>
    </div>
  );
};
