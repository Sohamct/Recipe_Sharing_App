import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import {FilterRecipe} from './FilterRecipe/FilterRecipe'
import { RecipeList } from './RecipeList/RecipeList';

export const RootLayout = () => {
  const containerStyle = {
    marginLeft: '50px',    // Set margin to 0
  };

  return (
    <div>
      <Navigation />
      <div className="container" style={containerStyle}>
      <FilterRecipe />
      <div className="row">
        <div className="col-md-4">
          <RecipeList />
        </div>
        
          <div className="col-md-8">
            <main>
              <Outlet/>
            </main>
          </div>
        
      </div>
    </div>
      
    </div>
  );
};
