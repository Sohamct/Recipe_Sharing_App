import React from 'react';
import { Navigation } from '../Navigation';
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