import React, {useState} from 'react';
import { useUser } from '../../../../features/UserContext';
import { useNavigate } from 'react-router-dom';
import '../../../../assets/css/StyleRecipeItem.css';
import RecipeFavoriteButton from '../../../Favorites/RecipeFavoriteButton.js';
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


  const calculateRelativeTime = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDifference = now - commentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} year${years >= 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months >= 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days >= 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours >= 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes >= 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds >= 1 ? 's' : ''} ago`;
    }
  };
  console.log(updatedAt, createdAt);
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

        <h5 className={`block mb-2 font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 ${!imageLoaded && 'skeleton skeleton-text'}`}>
            {imageLoaded ? 'Title :' : ''}  {imageLoaded ? (title.length > 19 ? title.slice(0, 19) + '...' : title) : ''}
          </h5>
          <div className='hover:cursor-pointer'>
            {imageLoaded && <RecipeFavoriteButton
              recipeId={_id}
            />}
            </div>

            <p className={`block font-sans text-sm antialiased font-light leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
            {imageLoaded ? 'By' : ''} {imageLoaded ? (owner === user.username ? 'You' : owner) : ''}
          </p>
          <p className={`block font-sans text-sm antialiased font-light leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
          {imageLoaded ? (updatedAt !== createdAt ? ('Updated ' + calculateRelativeTime(updatedAt)) : ('Created '+ calculateRelativeTime(createdAt))) : '' }
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

// import React, { useState } from 'react';
// import { useUser } from '../../../../features/UserContext';
// import { useNavigate } from 'react-router-dom';
// import '../../../../assets/css/StyleRecipeItem.css';
// import { useProgress } from '../../../../features/ProgressContext';
// import RecipeFavoriteButton from '../../../Favorites/RecipeFavoriteButton.js';


// export const RecipeItem = ({ _id, title, owner, date, description, image }) => {
//   const { user.username } = useUser();
//   const navigate = useNavigate();
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const { updateProgress } = useProgress();

//   const goToSpecificRecipe = () => {
//     navigate(`/viewrecipe/${_id}`);
//   };

//   const calculateRelativeTime = (timestamp) => {
//     const now = new Date();
//     const commentTime = new Date(timestamp);
//     const timeDifference = now - commentTime;
//     const seconds = Math.floor(timeDifference / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(months / 12);
//     if (years > 0) {
//       return `${years} year${years > 1 ? 's' : ''} ago`;
//     } else if (months > 0) {
//       return `${months} month${months > 1 ? 's' : ''} ago`;
//     } else if (days > 0) {
//       return `${days} day${days > 1 ? 's' : ''} ago`;
//     } else if (hours > 0) {
//       return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     } else if (minutes > 0) {
//       return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     } else {
//       return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//     }
//   };

  
//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   return (
//     <div className='container'>
//       <div className="relative flex flex-col text-gray-700 bg-white rounded-xl mt-4 border border-blue-50 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//         <div className="relative h-48 w-full overflow-hidden rounded-t-md shadow-md">
//           {!imageLoaded && (
//             <div
//               className="object-cover w-full h-full rounded-t-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md skeleton"
//               style={{ opacity: 0.7 }}
//             ></div>
//           )}
//           <img
//             src={require('../../../../assets/pizza.jpg')}
//             alt="card-image"
//             onLoad={handleImageLoad}
//             className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
//           />
//           {/* <img
//             src={require(`../../../../Uploads/${image}`)}
//             alt="card-image"
//             className={`object-cover w-full h-full rounded-t-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md ${!imageLoaded && 'hidden'}`}
//             onLoad={handleImageLoad}
//           /> */}
//         </div>
//         <div className="p-3 mt-2">
//           <h5 className={`block mb-2 font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 ${!imageLoaded && 'skeleton skeleton-text'}`}>
//             {imageLoaded ? 'Title :' : ''}  {imageLoaded ? title : ''}
//           </h5>
//           <div className='hover:cursor-pointer'>
//             <RecipeFavoriteButton
//               recipeId={_id}
//             />
//           </div>
//           {/* <p className={`block font-sans font-semibold text-sm leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
//             {imageLoaded ? (description.length > 30 ? `${description.substring(0, 40)}...` : description) : ''}
//           </p> */}
//           <p className={`block font-sans text-sm antialiased font-light leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
//             {imageLoaded ? 'By' : ''} {imageLoaded ? (owner === user.username ? 'You' : owner) : ''}
//           </p>
//           <p className={`block font-sans text-sm antialiased font-light leading-relaxed text-inherit ${!imageLoaded && 'skeleton skeleton-text'}`}>
//             {imageLoaded ? (calculateRelativeTime(date)) : ''}
//           </p>
//         </div>
//         <div className="p-3 pt-0">
//           {imageLoaded && (
//             <button
//               className="select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-md bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 hover:bg-gray-800 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
//               type="button"
//               onClick={goToSpecificRecipe}
//             >
//               View Recipe
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
