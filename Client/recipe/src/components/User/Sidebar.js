import React, { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import { fetchUserDetailsbyUsername } from '../../app/service/userApi';

function Sidebar(ownerName) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserDetailsbyUsername(ownerName.ownerName);
        // console.log(user);
        setUserDetails(user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserData();
  }, [])

const followers = userDetails?.followers || [];
const followings = userDetails?.followings || [];

const numFollowers = followers.length;
const numFollowings = followings.length;

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${userDetails.email}`;
  };

  return (
    <div>
      <p className='m-0 font-medium'>{userDetails?.firstname} {userDetails?.lastname}</p>
      <p className='m-0 text-gray-700'>{userDetails?.username}</p>
      <div className='flex mt-3'>
        <div className='flex'>
          <p className='px-1'>
            <PeopleIcon fontSize='small' />
          </p>
          <div className='bg-center items-center my-1'>
            <p className='text-sm text-gray-700'>
              {numFollowers} Followers 
            </p>
          </div>
        </div>

        <div className='flex mx-3'>
          <p className='px-1'>
            <PeopleOutlineIcon fontSize='small' />
          </p>
          <div className='bg-center items-center my-1'>
            <p className='text-sm text-gray-700'>
            {numFollowings} Following 
            </p>
          </div>
        </div>
      </div>

      <div className='flex mt-4'>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={userDetails?.instagramHandle} target="_blank" rel="noreferrer">
          <InstagramIcon sx={{ fontSize: 25 }} />
        </a>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={userDetails?.twitterHandle} target="_blank" rel="noreferrer">
          <XIcon sx={{ fontSize: 25 }} />
        </a>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={userDetails?.linkedinHandle} target="_blank" rel="noreferrer">
          <LinkedInIcon sx={{ fontSize: 30 }} />
        </a>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href="#" onClick={handleEmailClick}>
          <MailIcon sx={{ fontSize: 30 }} />
        </a>
      </div>
    </div>
  )
}

export default Sidebar;
