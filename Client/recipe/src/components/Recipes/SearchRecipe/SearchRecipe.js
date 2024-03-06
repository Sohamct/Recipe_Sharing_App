import React, { useState } from 'react';
import api from '../../../app/service/RecipeApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecipeItem } from '../RecipeList/RecipeItem/RecipeItem';

export const SearchRecipe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === '') {
        toast.error('Please fill out the search field.');
        return;
      }
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
      <div className="flex">
        <div className="relative mr-6 my-0 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            className="bg-purple-white rounded border border-gray-200 p-[7px] focus:outline-blue-900"
            placeholder="Search recipe..."
          />
          <div className="cursor-pointer absolute top-0 right-0 mt-[8px] mr-2.5 text-purple-lighter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-900"
              onClick={handleSearch}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full w-[90%] bg-gray-200 border border-gray-300 rounded-sm shadow-md mt-1 z-10">
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
            <div key={result._id}>
              <RecipeItem {...result} />
            </div>
          ))}
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};
