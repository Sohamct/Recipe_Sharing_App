import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModel';

function Header() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleFollowToggle = () => {
    if (isFollowing) {
      // Show the confirmation modal
      setConfirmationModalOpen(true);
    } else {
      setIsFollowing(!isFollowing);
    }
  };

  const handleConfirmUnfollow = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
    // Perform the unfollow action
    setIsFollowing(false);
  };

  const handleCancelUnfollow = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };

  return (
    <div className='border-b-[1px] py-6 px-3 border-gray-300 w-full'>
      <div className='flex gap-4 items-center'>
        <span className='font-customFont bg-red-200 rounded-full p-3 px-4'>
          K
        </span>
        <p className='mb-0 font-semibold text-2xl text-black'>Kevin Thumbar</p>
        <button
          className={`mb-0 mt-1 ml-auto font-medium rounded-md  
            ${isFollowing ? 'bg-gray-100 text-black border-2 border-gray-200 shadow-sm' : 'bg-blue-900 text-white  hover:bg-blue-800 '}
            py-1 px-3`}
          onClick={handleFollowToggle}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>

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
