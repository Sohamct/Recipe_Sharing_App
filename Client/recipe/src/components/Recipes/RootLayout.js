import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import {FilterRecipe} from './FilterRecipe/FilterRecipe'
import { RecipeList } from './RecipeList/RecipeList';

export const RootLayout = () => {

  return (
    <div>
      <Navigation />
        <div>
          <RecipeList />
        </div>
        
          {/* <div className="">
            <main>
              <Outlet/>
            </main>
          </div> */}
        
    </div>
  );
};