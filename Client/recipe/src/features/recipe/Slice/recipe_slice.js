import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../app/service/RecipeApi';

const initialState = {
  recipes: [],
  status: { fetch: 'idle', create: 'idle', search: 'idle' },
  error: { fetchError: null, createError: null, SearchError: null },
};


export const fetchRecipesAsync = createAsyncThunk('recipe/fetchRecipes', async (_, { rejectWithValue }) => {
  try {
    const response = await api.fetchRecipesAsync();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const createRecipeAsync = createAsyncThunk('recipe/createRecipe', async (recipeData, { rejectWithValue }) => {
  try {
    const response = await api.addRecipeAsync(recipeData);
    console.log(response);

    if (response.data) {
      return response.data;
    } else {
      console.log("wrong.....")
      const errorData = await response.json();
      throw new Error(errorData.errors[0].msg);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Define the async thunk for searching recipes
export const searchRecipesAsync = createAsyncThunk('recipe/searchRecipes', async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await api.searchRecipesAsync(searchTerm);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload)
      console.log(state.recipes)
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload)
    },
    updateRecipe: (state, action) => {
      const { id, updatedTitle } = action.payload;
      const existingRecipe = state.recipes.find((r) => r.id === id);
      if (existingRecipe) {
        existingRecipe.title = updatedTitle;
      }
    },
    getRecipeById: (state, action) => {
      const id = action.payload;
      console.log(state.recipes);
      const recipe = state.recipes.find((r) => r._id === id);
      console.log(recipe);
      return recipe;
    },

  },


  extraReducers: (builder) => {
    // create recipe

    builder
      .addCase(createRecipeAsync.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createRecipeAsync.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        console.log(action.payload)
        // console.log(state.recipes)
        const newRecipe = action.payload; // Assuming action.payload is the new recipe object
        state.recipes.push(newRecipe)

        state.error.createError = null;
      })

      .addCase(createRecipeAsync.rejected, (state, action) => {
        state.status.create = "failed";
        state.error.createError = action.payload;
      })
      .addCase(searchRecipesAsync.pending, (state) => {
        state.status.search = 'loading';
      })
      .addCase(searchRecipesAsync.fulfilled, (state, action) => {
        state.status.search = 'succeeded';
        state.recipes = action.payload.results; // Assuming action.payload contains search results
        state.error.searchError = null;
      })
      .addCase(searchRecipesAsync.rejected, (state, action) => {
        state.status.search = 'failed';
        state.error.searchError = action.payload;
      })

      .addCase(fetchRecipesAsync.pending, (state) => {
        state.status.fetch = 'loading';
      })
      .addCase(fetchRecipesAsync.fulfilled, (state, action) => {
        state.status.fetch = 'succeeded';
        state.recipes = action.payload.data
        console.log(action.payload.data)
        state.error.fetchError = null;

      })
      .addCase(fetchRecipesAsync.rejected, (state, action) => {
        state.status.fetch = 'failed';
        state.error.fetchError = action.payload;
      });

  }

})

export const selectRecipes = (state) => state.recipes;

// Selector to get a recipe by ID
export const selectRecipeById = (state, id) =>
  selectRecipes(state).find((recipe) => recipe._id === id);

export const { addRecipe, updateRecipe, removeRecipe, getRecipeById } = recipeSlice.actions;
export default recipeSlice.reducer;