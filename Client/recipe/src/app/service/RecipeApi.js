import axios from "axios";

const uri = 'http://localhost:5501/api/recipe';

const api = {
  
  addRecipeAsync: async (formData) => {
    try {
      console.log(formData);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("ingredients", JSON.stringify(formData.ingredients))
  
      const response = await axios.post(`${uri}/createrecipe`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("token"), // Use Authorization header for the token
        },
      });
  
      if (response.status === 201) {
        console.log("Recipe created successfully");
        return response.data;
      } else {
        console.error("Failed to create recipe:", response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to create recipe:", error.message);
      throw new Error(error.message);
    }
  },
  
  editRecipeAsync: async (formData) => {
    try {
      console.log(formData);
      const formDataToSend = new FormData();
      formDataToSend.append("_id", formData._id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("owner", formData.owner);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));
  
      // Append image if it exists
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.put(`${uri}/editrecipe`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          'auth-token': localStorage.getItem('token'),
        }
      });
  
      if (response.status === 201) {
        console.log("Recipe updated successfully");
        return response.data;
      } else {
        console.error("Failed to update recipe:", response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update recipe:", error.message);
      throw new Error(error.message);
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
      // console.log(data);

      if (response.ok) {
        return data; // Return the payload if the response is successful
      } else {
        throw new Error(data.errors[0].msg); // Throw an error if the response indicates an error
      }
    } catch (error) {
      throw new Error('Failed to fetch recipes'); // Throw a generic error if something goes wrong
    }
  },

  fetchRecipesByOwnerAsync: async (ownerName) => {
    try {
        const response = await fetch(`${uri}/fetchrecipesbyowner?owner=${ownerName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            return data; // Return the payload if the response is successful
        } else {
            throw new Error(data.errors[0].msg); // Throw an error if the response indicates an error
        }
    } catch (error) {
        throw new Error('Failed to fetch recipes by owner'); // Throw a generic error if something goes wrong
    }
},


  deleteRecipeAsync: async (deleteInfo) => {
    try {
      const response = await fetch(`${uri}/deleterecipe`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(deleteInfo)
      })
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
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
      console.log(data)
      if (response.ok) {
        return data.results || []; // Return the search results or an empty array if the 'results' property is not present
      } else {
        throw new Error(data.error || 'Unknown error'); // Throw an error with the specific error message from the server or a default message
      }
    } catch (error) {
      throw new Error(`Failed to search recipes: ${error.message}`); // Throw a generic error if something goes wrong
    }
  },

  getSuggestionsAsync: async (searchTerm) => {
    try {
      const response = await fetch(`${uri}/suggestions?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data.suggestions || [];
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      throw new Error(`Failed to get suggestions: ${error.message}`);
    }
  },

  getSuggestionsAsync: async (searchTerm) => {
    try {
      const response = await fetch(`${uri}/suggestions?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data.suggestions || [];
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      throw new Error(`Failed to get suggestions: ${error.message}`);
    }
  },

  addFavoriteAsync: async (userId, recipeId) => {
    try {
      const response = await fetch(`${uri}/addFavorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ userId, recipeId }),
      });

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        console.error('Error adding recipe to favorites:', data.message);
      }

      return data;
    } catch (error) {
      console.error('Failed to add recipe to favorites:', error.message);
      throw new Error('Internal Server Error');
    }
  },

  removeFavoriteAsync: async (userId, recipeId) => {
    try {
      const response = await fetch(`${uri}/removeFavorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ userId, recipeId })
      });

      // console.log(response);
      const data = await response.json();

      // console.log(data);
      if (response.ok)
        return data;
      else
        throw new Error(data.message);

    } catch (error) {
      throw new Error(`failed to remove the recipes from favorites : ${error.message}`);
    }
  },

  getFavoritesAsync: async () => {
    try {
      const response = await fetch(`${uri}/getFavorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to get favorites: ${error.message}`);
    }
  },

  checkIfRecipeIsFavoriteAsync: async (recipeId) => {
    try {
      const response = await fetch(`${uri}/checkIfRecipeIsFavorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ recipeId })
      })

      const data = await response.json();
      if (response.ok)
        return data;
      else
        throw new Error(data.message);
    } catch (error) {
      throw new Error(`failed to check if the recipe is already is favorite : ${error.message}`);
    }
  },

};

export default api;