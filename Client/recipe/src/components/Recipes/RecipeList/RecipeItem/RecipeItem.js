import React, {useState} from 'react';
import { useUser } from '../../../../features/context.js';

import { useNavigate } from 'react-router-dom';
import '../../../../assets/css/StyleRecipeItem.css';
import RecipeFavoriteButton from '../../../Favorites/RecipeFavoriteButton.js';
import {format} from 'timeago.js';
//import pizzaImage from '../../../../assets/pizza.jpg'

export const RecipeItem = ({  _id, title, owner, createdAt, description, image, updatedAt }) => {
  const { user } = useUser();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isAllNull = (_id == null && title==null && owner == null&& description==null);


  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const navigate = useNavigate();
  const goToSpecificRecipe = () => {
    navigate(`/viewrecipe/${_id}`);
  };
  // console.log(updatedAt, createdAt);
  return (
    <div className='container'>
    <div className="relative flex flex-col text-gray-700 bg-white rounded-xl w-80 mt-4 p-3 border border-blue-50 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative h-48 w-full overflow-hidden mb-2 rounded-md shadow-md">
            {!imageLoaded && (

            <div
              className="object-cover w-full h-full rounded-t-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md skeleton"
              style={{ opacity: 0.7 }}
            ></div>
            )}
            {!isAllNull && (image &&  <img
            src={image.url}
            onLoad={handleImageLoad}
            alt="card-image"
            className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
            />) || (<img
            src={require(`../../../../components/Uploads/default.png`)}
            onLoad={handleImageLoad}
            alt="card-image"
            className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
            />)
            }
        </div>

        <div className="p-3 mt-2">

        <div className="flex justify-between">
        <h5 className={`block mb-2 font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 ${!imageLoaded && 'skeleton skeleton-text'}`}>
            {imageLoaded ? (title?.length > 20  ? title?.slice(0, 20) + '...' : title) : '' }
          </h5>
          <div className='hover:cursor-pointer'>
            {imageLoaded && <RecipeFavoriteButton
              recipeId={_id}
            />}
            </div>
        </div>

            <p className={`block font-sans text-sm antialiased font-light leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
            {imageLoaded ? 'By' : ''} {imageLoaded ? (owner === user?.username ? 'You' : owner) : ''}
          </p>
          <p className={`block font-sans text-sm antialiased font-light leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
          {imageLoaded ? (new Date(createdAt) !== new Date(updatedAt) ? ('Updated ' + format(updatedAt)) : ('Created ' + format(createdAt))) : ''}
          </p>
        </div>
        <div className="p-4 pt-0">
        {imageLoaded && (
            <button
              className="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-md bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 hover:bg-gray-800 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={goToSpecificRecipe}
            >
              View Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

