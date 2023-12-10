import React from 'react';
import { FilterRecipe } from './FilterRecipe/FilterRecipe';
import { RecipeList } from './RecipeList/RecipeList';
import { RecipeShow } from './RecipeList/RecipeItem.js/RecipeShow';
import { useParams } from 'react-router-dom';

export const Recipes = () => {
  const { id } = useParams();

  return (
    <div className="container">
      <FilterRecipe />
      <div className="row">
        <div className="col-md-4">
          <RecipeList />
        </div>
        {id && (
          <div className="col-md-8">
            <RecipeShow />
          </div>
        )}
      </div>
    </div>
  );
};
