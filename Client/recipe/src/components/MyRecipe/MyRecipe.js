import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../app/service/RecipeApi';
import { useUser } from '../../features/context';
import { RecipeItem } from '../Recipes/RecipeList/RecipeItem/RecipeItem';

export const MyRecipe = () => {
  const { user } = useUser();
  const [userRecipes, setUserRecipes] = useState(new Array(16).fill(null));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUserRecipes = async () => {
      try {
        if (!user) return; // Guard against accessing user properties when user is null

        console.log('Fetching recipes...');
        console.log(user);
        const data = await api.fetchRecipesByOwnerAsync(user?.username);
        console.log(data);
        if (isMounted) {
          console.log('Data:', data.data);
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
  }, [user]);

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
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5'>
            {userRecipes.map((recipe, index) => (
              <RecipeItem key={index} {...recipe} />
            ))}
          </div>
        ) : (
          <>
            {userRecipes.length === 0 ? (
              <p className='container ml-8 text-xl text-center'>No Recipe Found</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-5 mb-10">
                {userRecipes.map((recipe) => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyRecipe;
