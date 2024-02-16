const uri = 'http://localhost:5501/api/recipe';

const api = {
  addRecipeAsync: async (recipeData) => {
    try {
      const response = await fetch(`${uri}/createrecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        const data = await response.json();
        return data; // Return the payload if the response is successful
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].msg); // Throw an error with the specific error message from the server
      }
    } catch (error) {
      throw new Error(`Failed to add recipe: ${error.message}`); // Include the original error message in the thrown error
    }
  },


  fetchRecipesAsync: async () => {
    try {
      const response = await fetch(`${uri}/fetchRecipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data; // Return the payload if the response is successful
      } else {
        throw new Error(data.errors[0].msg); // Throw an error if the response indicates an error
      }
    } catch (error) {
      throw new Error('Failed to fetch recipes'); // Throw a generic error if something goes wrong
    }
  },
  
  searchRecipesAsync: async (searchTerm) => {
    try {
      const response = await fetch(`${uri}/search?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.results || []; // Return the search results or an empty array if the 'results' property is not present
      } else {
        throw new Error(data.error || 'Unknown error'); // Throw an error with the specific error message from the server or a default message
      }
    } catch (error) {
      throw new Error(`Failed to search recipes: ${error.message}`); // Throw a generic error if something goes wrong
    }
  },
};
export default api
