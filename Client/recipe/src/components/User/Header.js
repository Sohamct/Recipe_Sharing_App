import React, { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModel';
import { useUser } from '../../features/context';
import { fetchUserDetails, fetchUserDetailsbyUsername, followUser, unfollowUser } from '../../app/service/userApi';

function Header({ ownerName, onFollowToggle }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false); // State to trigger component reload
  const { username } = useUser();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserDetailsbyUsername(ownerName);
        const user1 = await fetchUserDetails();
        setProfilePic(user.profileImage);
        setUserDetails(user);

        // Check if the current user is following the owner of the profile
        if (user.followers.includes(user1.user._id)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserData();
  }, [ownerName, username, reloadComponent]); // Add reloadComponent to dependencies

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // If already following, show the confirmation modal
        setConfirmationModalOpen(true);
      } else {
        // If not following, follow the user
        await followUser(userDetails._id);
        setIsFollowing(true);
        onFollowToggle(); // Trigger parent component reload
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const handleConfirmUnfollow = async () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
    // Perform the unfollow action
    try {
      await unfollowUser(userDetails._id);
      setIsFollowing(false);
      onFollowToggle(); // Trigger parent component reload
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleCancelUnfollow = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };

  return (
    <div className='border-b-[1px] py-6 px-3 border-gray-300 w-full'>
      <div className='flex gap-4 items-center'>
        <div className='font-customFont bg-red-300 rounded-full w-12 h-12 flex items-center justify-center'>
          {userDetails?.profileImage ? (
            <img src={require(`../../Uploads/User/${profilePic}`)} alt="Profile" className="w-full h-full rounded-full" />
          ) : (
            <>
              {userDetails?.firstname?.charAt(0)}{userDetails?.lastname?.charAt(0)}
            </>
          )}
        </div>
        <p className='mb-0 font-semibold text-2xl text-black'>
          {userDetails?.firstname} {userDetails?.lastname}
        </p>
        {username !== ownerName && (
          <button
            className={`mb-0 mr-5 mt-1 ml-auto font-medium rounded-md  
              ${isFollowing ? 'bg-gray-100 text-black border-2 border-gray-200 shadow-sm' : 'bg-blue-900 text-white  hover:bg-blue-800 '}
              py-1 px-3`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCancelUnfollow}
          onConfirm={handleConfirmUnfollow}
        />
      </div>
    </div>
  );
}

export default Header;
