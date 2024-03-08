import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../app/service/RecipeApi';
import { RecipeItem } from '../RecipeList/RecipeItem/RecipeItem';

export const SearchResults = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Clear previous search results
        setSearchResults([]);
        setLoading(true);

        const results = await api.searchRecipesAsync(searchTerm);
        setSearchResults(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch search results when the component mounts or search term changes
    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className='p-4 m-auto'>
      <div>
        <div className='flex items-center mb-4 mx-4 pt-2'>
          {searchTerm && (
            <h3 className='text-3xl font-semibold text-gray-800'> <span className='text-3.5xl pr-2 bg-center'>&#x2BAB;</span> 
              Search Results for "{searchTerm}" :
            </h3>
          )}
          <button
            className='ml-auto bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
        <hr />

        {loading ? (
          <p className='bg-center text-center'>Loading your search results...</p>
        ) : searchResults.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-4'>
            {searchResults.map((result) => (
              <RecipeItem key={result._id} recipe={result} />
            ))}
          </div>
        ) : (
          <p className='mx-4 text-gray-700 text-xl'>No results found</p>
        )}

        {error && <p className='text-red-500'>Error: {error}</p>}
      </div>
    </div>
  );
};
