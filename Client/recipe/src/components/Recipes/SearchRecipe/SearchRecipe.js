import React, { useState, useEffect } from 'react';
import api from '../../../app/service/RecipeApi';
import { useNavigate } from 'react-router-dom';
import { RecipeItem } from '../RecipeList/RecipeItem/RecipeItem';

const SearchRecipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const results = await api.searchRecipesAsync(searchTerm);
      setSearchResults(results);

      if (searchTerm.trim() !== '') {
        const navigationUrl = `/search-results?q=${encodeURIComponent(searchTerm)}`;
        navigate(navigationUrl);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = async (value) => {
    setSearchTerm(value);

    if (value.trim() !== '') {
      try {
        const suggestions = await api.getSuggestionsAsync(value);
        setSuggestions(suggestions);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    const navigationUrl = `/search-results?q=${encodeURIComponent(suggestion.name)}`;
    navigate(navigationUrl);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search recipe..."
        className="border border-gray-300 w-56 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-800"
      />

      <button
        onClick={handleSearch}
        disabled={!searchTerm.trim()} // Disable button when input is empty
        className="ml-2 px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <div className="absolute top-full w-56 bg-gray-200 border border-gray-300 rounded-sm shadow-md mt-1 z-10">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}

      {searchResults && searchResults.length > 0 && (
        <div className="mt-16">
          <h3>Search Results:</h3>
          {searchResults.map((result) => (
            <div key={result.id}>
              <RecipeItem recipe={result} />
            </div>
          ))}
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SearchRecipe;
