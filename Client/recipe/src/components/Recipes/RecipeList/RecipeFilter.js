import React, { useState } from 'react';

export function RecipeFilter() {
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({
    dishType: '',
    rating: '',
    recipeType: 'all'
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    // Here you can perform actions based on the selected filters, like fetching filtered data from your database or triggering some other function.
    // For now, let's just log the selected filters.
    console.log("Filters:", filters);

    // Close the popup after applying filters
    togglePopup();
  };

  return (
    <div className="container mx-auto">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={togglePopup}>Filter</button>
      {showPopup && (
        <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-6 z-10">
          <button className="close-button absolute top-0 right-0 mt-3 mr-3 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={togglePopup}>Close</button>
          <div className="filter-option mb-4">
            <label htmlFor="dish-type" className="block font-bold">Dish Type:</label>
            <select id="dish-type" name="dishType" value={filters.dishType} onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-1 w-full">
              <option value="">All</option>
              <option value="gujrati">Gujrati</option>
              <option value="south-indian">South Indian</option>
              <option value="italian">Italian</option>
            </select>
          </div>
          <div className="filter-option mb-4">
            <label htmlFor="rating" className="block font-bold">Rating:</label>
            <select id="rating" name="rating" value={filters.rating} onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-1 w-full">
              <option value="">All</option>
              <option value="1">1 Star</option>
              <option value="2">2 Star</option>
              <option value="3">3 Star</option>
              <option value="4">4 Star</option>
              <option value="5">5 Star</option>
            </select>
          </div>
          <div className="filter-option mb-4">
            <label htmlFor="recipe-type" className="block font-bold">Recipe Type:</label>
            <select id="recipe-type" name="recipeType" value={filters.recipeType} onChange={handleFilterChange} className="border border-gray-300 rounded px-3 py-1 w-full">
              <option value="all">All</option>
              <option value="premium">Premium</option>
              <option value="not-premium">Not Premium</option>
            </select>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={applyFilters}>Apply Filters</button>
        </div>
      )}
      {showPopup && <div className="popup-overlay fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50" onClick={togglePopup}></div>}
    </div>
  );
}

