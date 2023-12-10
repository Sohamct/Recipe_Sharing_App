import React from 'react'
import RecipeList from '../Recipes/RecipeList/RecipeList'
import { RecipeShow } from '../Recipes/RecipeList/RecipeItem.js/RecipeShow'

export const MyRecipe = () => {
  return (
    <>
        <RecipeList isOwner={true}/>
        <RecipeShow/>
    </>
  )
}

export function loader(){

}