import React from 'react';
import { Navigation } from '../Navigation';
import ProgressBar from '../ProgressBar';
import { RecipeList } from './RecipeList/RecipeList';


export const RootLayout = () => {
  return (
    <div>
      <ProgressBar/>
      <Navigation />
      <RecipeList/>

    </div>
  );
};
