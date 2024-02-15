import React, { useState } from 'react';
import SearchRecipe from '../SearchRecipe/SearchRecipe';

export const FilterRecipe = ({ onFilter }) => {
  const [category, setCategory] = useState('all');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFilter = () => {
    // Pass the filter options to the parent component
    onFilter({ category });
  };

  return (
    <div>
      <div className="flex items-center">
        <SearchRecipe />
        <div className='mx-3'>
          <select
            id="category"
            className="border rounded-md p-2"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>
        <div>
          <button
            className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};