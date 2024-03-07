// UserProfile.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import { RecipeList } from '../Recipes/RecipeList/RecipeList';
import { Navigation } from '../Navigation';
import { useUser } from '../../features/context';
import { useParams } from 'react-router-dom';
import RecipeOwnedUser from './RecipeOwnedUser';

const UserProfile = () => {
  // Get the logged-in user from the context
  const { username } = useUser();
  
  const params = useParams();
  const { username: ownerName } = params;

  // console.log("Owner of this recipe is: ", ownerName);
 
  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = (ownerName === username);

  // console.log("logged in user's username is " + username);

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className='container px-0 border-[1px] border-gray-200 mb-16 mt-8 rounded-md shadow-sm'>
        <Header />
        <div className='flex'>
          <div className='p-4 w-[30%] border-r-[1px] border-gray-200'>
            <Sidebar />
          </div>
          <div className='w-full'>
            {isOwnProfile ? <Content /> : <RecipeOwnedUser ownerName={ownerName}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
