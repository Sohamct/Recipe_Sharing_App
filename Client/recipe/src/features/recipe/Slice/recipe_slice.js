
import api from '../../../app/service/RecipeApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  status: { fetch: 'idle', create: 'idle', search: 'idle', edit: 'idle', delete: 'idle' },
  error: { fetchError: null, createError: null, searchError: null, editError: null, deleteError:null},
};
export const editRecipeAsync = createAsyncThunk('recipe/editrecipe', async (arg, { rejectWithValue }) => {
  try {
    const {recipeData, updateProgress} = arg;
    updateProgress(30);
    const response = await api.editRecipeAsync(recipeData);

    if(response.data);
    return response;
  
  } catch (error) {
    console.error('editRecipeAsync failed:', error);
    return rejectWithValue(error.message);
  }
});

export const deleteRecipeAsync = createAsyncThunk('recipe/deleteRecipe', async (arg, {rejectWithValue}) => {
  try{
    const {data, updateProgress} = arg;
    updateProgress(30);
    const response = await api.deleteRecipeAsync(data);
    updateProgress(70);
    return response;
  }catch(error){
    return rejectWithValue(error.message);
  }
})

export const fetchRecipesAsync = createAsyncThunk('recipe/fetchRecipes', async (updateProgress, { rejectWithValue }) => {
  try {
    let progress = 0;
    let responseReceived = false;

    const intervalId = setInterval(() => {
      if (!responseReceived && updateProgress) {
        progress += 2;
        updateProgress(progress);

        if (progress >= 85) {
          clearInterval(intervalId); // Stop the interval
        }
      }
    }, 100);

    const response = await api.fetchRecipesAsync();
    responseReceived = true; 
    clearInterval(intervalId); 
    updateProgress(100); 
    // console.log(response);

    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createRecipeAsync = createAsyncThunk('recipe/createRecipe', async (arg, { rejectWithValue }) => {
  try {
    const {formData, updateProgress} = arg;
    console.log(arg)
    console.log(formData);
    updateProgress(30);
    const response = await api.addRecipeAsync(formData);

    if (response.data) {
      return response.data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors[0].msg);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const searchRecipesAsync = createAsyncThunk('recipe/searchRecipes', async (searchTerm, { rejectWithValue, extra }) => {
  try {
    const {updateProgress} = extra;
    updateProgress(30);
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
    addRecipe_: (state, action) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
    },
    updateRecipe: (state, action) => {
      const { id, updatedTitle } = action.payload;
      const existingRecipe = state.recipes.find((recipe) => recipe.id === id);
      if (existingRecipe) {
        existingRecipe.title = updatedTitle;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipeAsync.pending, (state) => {
        state.status.create = 'loading';
      })
      .addCase(createRecipeAsync.fulfilled, (state, action) => {
        state.status.create = 'succeeded';
        state.recipes.push(action.payload);
        state.error.createError = null;
      })
      .addCase(createRecipeAsync.rejected, (state, action) => {
        state.status.create = 'failed';
        state.error.createError = action.payload;
      })
      .addCase(searchRecipesAsync.pending, (state) => {
        state.status.search = 'loading';
      })
      .addCase(searchRecipesAsync.fulfilled, (state, action) => {
        state.status.search = 'succeeded';
        state.recipes = action.payload.results;
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
        state.recipes = action.payload.data;
        state.error.fetchError = null;
      })
      .addCase(fetchRecipesAsync.rejected, (state, action) => {
        state.status.fetch = 'failed';
        state.error.fetchError = action.payload;
      })
      .addCase(editRecipeAsync.pending, (state) => {
        state.status.edit = 'loading';
      })
      .addCase(editRecipeAsync.fulfilled, (state, action) => {
        state.status.edit = 'succeeded';
        const editedRecipe = action.payload.data;
        state.recipes = state.recipes.map(recipe => 
          recipe._id === editedRecipe._id ? editedRecipe : recipe);
          state.error.editError = null
      })
      .addCase(deleteRecipeAsync.pending, (state, action) => {
        state.status.delete = 'loading'
      })
      .addCase(deleteRecipeAsync.rejected, (state, action) => {
        state.error.deleteError = action.payload;
        state.status.delete = 'failed'
      }).addCase(deleteRecipeAsync.fulfilled, (state, action) => {
        state.error.deleteError = null;
        state.status.delete = 'success';
        const deletedRecipe = action.payload.data;
        state.recipes = state.recipes.filter((recipe) => 
          recipe._id !== deletedRecipe._id )
      })
  },
});

export const selectRecipes = (state) => state.recipes.recipes;

export const { addRecipe_, updateRecipe, removeRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;