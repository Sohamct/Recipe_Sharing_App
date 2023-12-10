import React from 'react'

export const RecipeShow = () => {
  return (
    <div>RecipeShow</div>
  )
}

export function loader({params}){
    const recipeId = params.id;
    return getRecipe(recipeId)
}

function getRecipe(){

}