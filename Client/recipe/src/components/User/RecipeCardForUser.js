import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../features/context';

export const RecipeCardForUser = ({ recipe }) => {

  console.log(recipe);

  // const { username } = useUser();
  const navigate = useNavigate();
  
  if (!recipe || typeof recipe !== 'object' || !('_id' in recipe)) {
    // Handle the case where recipe is undefined or doesn't have _id property
    return null; // or display an error message
  }
  const { _id, title } = recipe;

  const goToSpecificRecipe = () => {
    navigate(`/viewrecipe/${_id}`);
  };

  return (
    <div className='container'>
      <div className="relative flex flex-col text-gray-700 bg-white rounded-xl w-52 h-64 mt-4 p-2 border border-blue-50 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        <div className="relative h-32 w-full overflow-hidden mb-2 rounded-md shadow-md">
        {recipe?.image.url ? (
        <img
          src={recipe?.image.url}
          alt="recipeImage"
          className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
        />
      ) : (
        <img
          src={require(`../../components/Uploads/default.png`)}
          alt="DefaultRecipe"
          className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
        />
      )}
        </div>

        <div className="p-1 mt-1">
          <p className="block font-customFont font-semibold text-sm leading-relaxed text-inherit">
            {title}
          </p>
        </div>
        <div className="p-2">
          <button
            className="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-2 rounded-md bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 hover:bg-gray-800 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={goToSpecificRecipe}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
