import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../app/service/RecipeApi';
import { useUser } from '../../features/UserContext';
import { RecipeItem } from '../Recipes/RecipeList/RecipeItem/RecipeItem';

export const MyRecipe = () => {
  const params = useParams();
  const { username: ownerName } = params;
  const { username: loggedInUsername } = useUser();
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUserRecipes = async () => {
      try {
        console.log('Fetching recipes...');
        const data = await api.fetchRecipesByOwnerAsync(loggedInUsername);

        if (isMounted) {
          console.log('Data:', data);
          setUserRecipes(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user recipes:', error.message);

        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserRecipes();

    return () => {
      isMounted = false;
    };
  }, [ownerName, loggedInUsername]);

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <div>
        <div className='flex items-center mx-4 pl-9 mb-3 pt-2'>

        <h3 className='pt-4 text-gray-800 '>  <span className='text-3.5xl bg-center'>&#x2BAB;</span> Recipes owned by you...</h3>
        <button
            className='ml-auto mr-6 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
            onClick={goBack}
            >
            Go Back
          </button>
            </div>
        <hr />
        {loading ? (
          <p className='text-center bg-center'>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5 mb-10">
            {userRecipes.map((recipe) => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyRecipe;
