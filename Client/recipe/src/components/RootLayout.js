import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export const RootLayout = ({ id }) => {
  return (
    <div>
      <Navigation />
      <main style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        
          <Outlet id={id} />
        
          {id ? <Outlet id={id} /> : 'Please select a recipe'}
        
      </main>
    </div>
  );
};
