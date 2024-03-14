import React from 'react';
import { FiEdit } from "react-icons/fi";

function Content() {

  const userEmail = 'example@gmail.com';
  const userInstagramLink = 'https://www.instagram.com/example/';
  const userLinkedinLink = 'https://www.linkedin.com/in/example/';
  const userTwitterLink = 'https://twitter.com/example/';

  return (
    <div>
      <div className='px-4 py-2'>
        <div className='my-3'>

        <div className='my-3'>
            <label htmlFor="username" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Username</label>
            <div className='flex'>
              <p className="m-0 p-0" type='email' name='email' id='email' > kevint11</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label for="email" className="block text-sm font-medium text-gray-900">Your email</label>
            <div className='flex py-1'>
              <p className='p-0 m-0' type='email' name='email' id='email' > example@gmail.com</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="firstname" className="block mt-2 text-sm font-medium text-gray-900">First Name</label>
            <div className='flex'>
              <p className="m-0 p-0" type='email' name='email' id='email' > Kevin</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="lastname" className="block mt-4 mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
            <div className='flex'>
              <p className="m-0 p-0" type='email' name='email' id='email' > Thumbar </p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="isPrivate" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Visibility of your account</label>
            <div className='flex'>
              <p className="m-0 p-0" type='email' name='email' id='email' > Private </p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="instagram" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Instagram</label>
            <div className='flex items-center'>
              <p className="m-0 p-0">{userInstagramLink}</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="linkedin" className="block mt-4 mb-2 text-sm font-medium text-gray-900">LinkedIn</label>
            <div className='flex items-center'>
              <p className="m-0 p-0" >{userLinkedinLink}</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

          <div className='my-3'>
            <label htmlFor="twitter" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Twitter</label>
            <div className='flex items-center'>
              <p className="m-0 p-0">{userTwitterLink}</p>
              <div className='mt-0.5 bg-center ml-auto'>
                <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Content