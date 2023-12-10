import React from 'react'
import { RecipeItem } from './RecipeItem';

export const RecipeShow = () => {
  return (
    <div><RecipeItem id={1} title={"Pizza"}/></div>
  )
}

export function loader({params}){
    const recipeId = params.id;
    return getRecipe(recipeId)
}

function getRecipe(){
  // through backend api
}