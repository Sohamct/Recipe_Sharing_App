import FilterComponent from '../../components/Filter/FilterComponent'; // Import the FilterComponent
import React, { useState } from 'react';
import { Navigation } from '../Navigation';
import { RecipeList } from './RecipeList/RecipeList';
import  ProgressBar from '../ProgressBar';

export const RootLayout = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div>
      <ProgressBar/>
      <Navigation />
      <div className="flex">
        <div className={`w-1/4 ${isFilterOpen ? '' : 'hidden'}`}>
          <FilterComponent isOpen={isFilterOpen} toggleFilter={toggleFilter} />
        </div>
        <div className={`w-${isFilterOpen ? '3/4' : 'full'}`}>
          <RecipeList />
        </div>
      </div>
    </div>
  );
};
