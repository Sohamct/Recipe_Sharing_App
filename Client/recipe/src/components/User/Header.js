import React, { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModel';

function Header() {

  return (
    <div className='border-b-[1px] py-6 px-3 border-gray-300 w-full'>
      <div className='flex gap-4 items-center'>
        <span className='font-customFont bg-red-200 rounded-full p-3 px-4'>
          K
        </span>
        <p className='mb-0 font-semibold text-2xl text-black'>Kevin Thumbar</p>
      </div>
    </div>
  );
}

export default Header;
