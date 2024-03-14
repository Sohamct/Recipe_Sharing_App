import React from 'react';
import { Navigation } from '../Navigation';
import { RecipeList } from './RecipeList/RecipeList';
import ProgressBar from '../ProgressBar';


export const RootLayout = () => {
  return (
    <div>
      <ProgressBar/>
      <Navigation />
      <div className="flex">
        <div>
          {/* Removed the FilterComponent JSX */}
        </div>
        <div>
          <RecipeList />
        </div>
      </div>
    </div>
  );
};
