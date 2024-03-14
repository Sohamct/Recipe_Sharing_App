import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import { Navigation } from '../Navigation';

const userProfile = () => {
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
            <Content />
          </div>
        </div>
      </div>
    </div>

  )
}

export default userProfile;