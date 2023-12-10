import React from 'react'
import {RecipeList} from '../Recipes/RecipeList/RecipeList'
import { RecipeShow } from '../Recipes/RecipeList/RecipeItem/RecipeShow'

export const MyRecipe = () => {
  return (
    <>
        <RecipeList/>
        <RecipeShow/>
    </>
  )
}

export function loader(){

}