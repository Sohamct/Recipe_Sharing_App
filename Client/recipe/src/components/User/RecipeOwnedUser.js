import React, { useState, useEffect } from 'react';
import api from '../../app/service/RecipeApi';
import { RecipeCardForUser } from './RecipeCardForUser';

const RecipeOwnedUser = ({ ownerName }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.fetchRecipesByOwnerAsync(ownerName);
                setRecipes(data.data); // Assuming the data property contains the recipes array
            } catch (error) {
                console.error('Error fetching recipes:', error.message);
            }
        };

        fetchData();
    }, [ownerName]);

    return (
        <div>
            <h3 className='px-4 pt-3 text-gray-800'>Recipes Owned by you : </h3>
            <hr />
            <ul>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-3'>
                    {recipes.map((recipe) => (
                        <RecipeCardForUser key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default RecipeOwnedUser;
