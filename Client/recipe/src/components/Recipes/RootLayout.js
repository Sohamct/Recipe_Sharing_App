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
        <div>
          <RecipeList />
        </div>
        
          {/* <div className="">
            <main>
              <Outlet/>
            </main>
          </div> */}
        
      </div>
    </div>
  );
};
