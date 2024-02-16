import React from 'react';

const RecipeDetail = ({ recipeId }) => {
    // Fetch recipe details based on recipeId and render them

    return (
        <div>
            <h1>Recipe Details</h1>
            <p>Recipe ID: {recipeId}</p>
        </div>
    );
};

export default RecipeDetail; 

