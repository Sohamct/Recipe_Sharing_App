import {configureStore} from '@reduxjs/toolkit' // core redux
import recipeReducer from '../features/recipe/Slice/recipe_slice'


export const store = configureStore({
    reducer:{
        recipes: recipeReducer,
    }

})
