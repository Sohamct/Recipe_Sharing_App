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

  editRecipeAsync: async (recipeData) => {
    try {
      const response = await fetch(`${uri}/editrecipe`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(recipeData),
      });
  
      if (response.ok || response.status === 201) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        //console.log(errorData);
        throw new Error(errorData.message); // Throw an error with the specific error message from the server
      }
    } catch (error) {
      throw new Error(`Failed to edit recipe: ${error.message}`); // Include the original error message in the thrown error
    }
  },
  
  fetchRecipesAsync: async () => {
    try {
      const response = await fetch(`${uri}/fetchrecipes`, {
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

  deleteRecipeAsync: async (deleteInfo) => {
    try{
      const response = await fetch(`${uri}/deleterecipe`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(deleteInfo)
      })
      const data = await response.json();

      if(response.ok){
        return data;
      }else{
        throw new Error(data.message);
      }
    }catch(error){
      throw new Error('Failed to delete the recipe');
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

  getSuggestionsAsync: async (keyword) => {
    try {
      const response = await fetch(`${uri}/suggestions?q=${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      try {
        const data = await response.json();
        return data.suggestions || [];
      } catch (jsonError) {
        throw new Error(`Failed to parse JSON: ${jsonError.message}`);
      }
    } catch (error) {
      throw new Error(`Failed to get suggestions: ${error.message}`);
    }
  },

};

export default api
