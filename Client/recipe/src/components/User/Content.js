import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { fetchUserDetails } from '../../app/service/userApi';

function Content() {
  
  const [userDetails, setUserDetails] = useState(null);

  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserDetails();
        setUserDetails(user.user);
        // console.log(user.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserData();
  },[]);

  return (
    <div>
      {userDetails ? ( <div className='px-4 py-2'>
        <div className='my-3'>

        <div className='my-3'>
            <label htmlFor="username" className="block mt-4 text-sm font-medium text-gray-900">Username</label>
            <div className='flex py-2'>
              <p className="m-0 p-0" type='text' name='username' id='username' >{userDetails.username} </p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Your email</label>
            <div className='flex py-2'>
              <p className='p-0 m-0' type='email' name='email' id='email' > {userDetails.email}</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="firstname" className="block mt-4 text-sm font-medium text-gray-900">First Name</label>
            <div className='flex py-2'>
              <p className="m-0 p-0" type='text' name='firstname' id='firstname' > {userDetails.firstname} </p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="lastname" className="block mt-4 text-sm font-medium text-gray-900 ">Last Name</label>
            <div className='flex py-2'>
              <p className="m-0 p-0" type='text' name='lastname' id='lastname' > {userDetails.lastname} </p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="instagram" className="block mt-4 text-sm font-medium text-gray-900">Instagram</label>
            <div className='flex py-2 items-center'>
              <a className="m-0 p-0 cursor-pointer text-gray-900 no-underline">{userDetails.instagramHandle}</a>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="linkedin" className="block mt-4 text-sm font-medium text-gray-900">LinkedIn</label>
            <div className='flex py-2 items-center'>
              <a className="m-0 p-0 cursor-pointer text-gray-900 no-underline">{userDetails.linkedinHandle}</a>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="twitter" className="block mt-4 text-sm font-medium text-gray-900">Twitter</label>
            <div className='flex py-2 items-center'>
              <a className="m-0 p-0 cursor-pointer text-gray-900 no-underline">{userDetails.twitterHandle}</a>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

        </div>
      </div>
         ) : (
        <p>Loading user details...</p>
      )}
    </div>
  )
}

export default Content;
