import React, { useState } from 'react';
import api from '../../../app/service/RecipeApi';
import { useNavigate } from 'react-router-dom';
import { RecipeItem } from '../RecipeList/RecipeItem/RecipeItem';

const SearchRecipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const results = await api.searchRecipesAsync(searchTerm);
      setSearchResults(results);
      console.log('Updated searchResults:', results);

      // Navigate to the search results page only if the search term is not empty
      if (searchTerm.trim() !== '') {
        const navigationUrl = `/search-results?q=${encodeURIComponent(searchTerm)}`;
        console.log('Navigating to:', navigationUrl);
        navigate(navigationUrl);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKeyPress = (e) => {
    // Navigate to search results page on 'Enter' key press
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search recipe..."
        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-800"
      />

      <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500">
        Search
      </button>

      {searchResults && searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          {searchResults.map((result) => (
            <RecipeItem key={result.id} recipe={result} />
          ))}
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SearchRecipe;