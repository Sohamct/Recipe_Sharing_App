import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid generate unique id

const initialState = {
    recipes: [{id: 1, title: "Pizza"}]
}

// make slice
export const recipeSlice = createSlice({
    name: '_recipe', // name of slice
    initialState,
    reducers: {
        addRecipe: (state, action)=>{
            const recipe = {
                id: nanoid(),                        // always get state and action, state=currentstate  
                title: action.payload                // payload is object
            }
            state.recipes.push(recipe)
            console.log(recipe.title)
        }, 
        removeRecipe: (state, action) => {
            state.recipes = state.recipes.filter((r) => r.id !== action.payload)
        },
        updateRecipe: (state, action) => {
            const {id, updatedTitle} = action.payload;
            const existingRecipe = state.recipes.find((r) => r.id === id)
            if(existingRecipe){
                existingRecipe.title = updatedTitle
            }
        },
        getRecipeById: (state, action) => {
            const id = action.payload;
            const recipe = state.recipes.find(r => r.id === id)
            return recipe
        }
    }
})

export const {addRecipe, removeRecipe, getRecipeById} = recipeSlice.actions

export default recipeSlice.reducer   // to inform the store (registering reducers)