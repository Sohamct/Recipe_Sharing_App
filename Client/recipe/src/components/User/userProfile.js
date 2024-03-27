import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import { Navigation } from '../Navigation';
import { useUser } from '../../features/context';
import { useParams } from 'react-router-dom';
import RecipeOwnedUser from './RecipeOwnedUser';

const UserProfile = () => {
  const [reloadKey, setReloadKey] = useState(0);

  // Get the logged-in user from the context
  const { username } = useUser();
  
  const params = useParams();
  const { username: ownerName } = params;
 
  const isOwnProfile = (ownerName === username);

  useEffect(() => {
    // reload the page whenever there's a change in ownerName
    setReloadKey(prevKey => prevKey + 1); // Increment key to force re-render
  }, [ownerName]);

  const handleFollowToggle = () => {
    setReloadKey(prevKey => prevKey + 1); // Increment key to force re-render
  };

  return (
    <div key={reloadKey}>
      <div>
        <Navigation />
      </div>
      <div className='container px-0 border-[1px] border-gray-200 mb-16 mt-8 rounded-md shadow-sm'>
        <Header ownerName={ownerName} onFollowToggle={handleFollowToggle} />
        <div className='flex'>
          <div className='p-4 w-[30%] border-r-[1px] border-gray-200'>
            <Sidebar ownerName={ownerName}/>
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
