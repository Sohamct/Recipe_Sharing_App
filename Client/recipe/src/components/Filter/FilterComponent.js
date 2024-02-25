import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './FilterComponent.css'; // Create a corresponding CSS file for styling

const FilterComponent = ({ isOpen, toggleFilter }) => {
  return (
    <div className={`filter-component w-64 bg-gray-100 border-r border-gray-300 transition-transform duration-300 ease-in-out ${isOpen ? '' : '-translate-x-64'}`}>
      <div className="filter-header flex items-center justify-between bg-gray-200 px-4 py-2">
        <h3>Filters</h3>
        <button onClick={toggleFilter}>
          <FaFilter />
        </button>
      </div>
      <div className="filter-content p-4">
        {/* Add filter options here */}
        <p>Filter option 1</p>
        <p>Filter option 2</p>
        <p>Filter option 3</p>
      </div>
    </div>
  );
};

export default FilterComponent;
