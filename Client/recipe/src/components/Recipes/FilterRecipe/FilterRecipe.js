import React from 'react'
import { useState } from 'react';

export const FilterRecipe= ({ onFilter }) => {
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // const handleFilter = () => {
    //   // Pass the filter options to the parent component
    //   onFilter({ category, searchTerm });
    // };
  
    return (
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-md-4">
          {/* <label htmlFor="search" className="form-label">Search:</label> */}
          <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            
          </div>
  
          <div className="col-md-4">
            {/* <label htmlFor="category" className="form-label">Category:</label> */}
            <select id="category" className="form-select" value={category} onChange={handleCategoryChange}>
              <option value="all">All</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
              
            </select>
          </div>
  
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={""}>Filter</button>
          </div>
        </div>
      </div>
    );
  };
