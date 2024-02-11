import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipesAsync } from '../../../../features/recipe/Slice/recipe_slice'; // Import your fetch action
import { Navigation } from '../../../Navigation';

export const RecipeShow = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipeId = params.id;

  // Fetch recipes from the Redux store
  const recipes = useSelector((state) => state.recipes.recipes);
  const loading = useSelector((state) => state.recipes.status === 'loading');

  // Fetch recipes when the component mounts or the recipe ID changes
  useEffect(() => {
    dispatch(fetchRecipesAsync());
  }, [dispatch, recipeId]);

  // Find the specific recipe by ID
  const recipe = recipes.find((r) => r._id === recipeId);

  // If the data is still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If recipe is not found, redirect to a different page
  if (!recipe) {
    navigate('/not-found');
    return null; // Prevent rendering anything else
  }

  const { _id, title, description, date, ingredients } = recipe;

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className='pt-7'>

        <div className="mx-auto block w-3/4 px-4 pt-6 text-sm border border-gray-300 rounded-lg shadow-md p-4">
          <div>
            <h5 className="text-xl font-semibold">{title}</h5>
            <p className="text-gray-600">Recipe ID: {_id}</p>
            <p className="text-gray-600">
              <small>{new Date(date).toLocaleString()}</small>
            </p>
          </div>

          <div className="mt-4">
            <h6 className="text-lg font-semibold">Ingredients:</h6>
            <ul className="list-disc list-inside">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient.ingredient_name} ({ingredient.quantity} {ingredient.quantity_type})
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <h6 className="text-lg font-semibold">Steps:</h6>
              <ol className="list-decimal list-inside">
                {Array.isArray(description) ? (
                  description.map((step, index) => (
                    <li key={index} className="text-gray-700">
                      {step}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-700">{description}</li>
                )}
              </ol>
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Like</button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => navigate('/chat')}>
                Chat
              </button>
              <i className="far fa-heart text-gray-700"></i>
              <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Follow</button>
              <button className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600">Add to Favorite</button>
            </div>

            <div className="mt-6">
              <input type="text" className="border border-gray-300 rounded-md p-2 w-full mb-2" placeholder="Type your message" />
              <button className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit Chat</button>
                  <div>

              <button className="flex justify-end mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Back </button>
                  </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
