import {ConfigureStore, configureStore} from '@reduxjs/toolkit' // core redux

import recipeReducer from '../features/recipe/recipeSlice'


export const store = configureStore({
    reducer: recipeReducer
})
