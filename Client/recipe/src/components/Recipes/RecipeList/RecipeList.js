import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeItem } from './RecipeItem/RecipeItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipesAsync } from '../../../features/recipe/Slice/recipe_slice';

export const RecipeList = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const recipesState = useSelector((state) => state.recipes);
    // Determine isOwner based on the current location
    const isOwner = location.pathname === '/myrecipe';
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchRecipesAsync());
                console.log(recipesState.recipes)

            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    if (recipesState.status === 'loading') {
        return <h3>Loading...</h3>;
    }

    if (recipesState.status === 'failed') {
        return <p>Error: {recipesState.error.fetchError}</p>;
    }

    const recipes = recipesState.recipes || [];

    return (
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-8">
             {recipes.map((recipe) => (
                <RecipeItem key={recipe._id} {...recipe} isOwner={isOwner} />
            ))}
        </div>
    );
};
