import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export const RootLayout = () => {
  return (
    <div>
        <div>
      <Navigation />
      <main style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ flex: '1', paddingRight: '1rem' }}>
          <Outlet />
        </div>
        <div style={{ flex: '1', paddingLeft: '1rem' }}>
          Please select a recipe or <Outlet />
        </div>
      </main>
    </div>
    </div>
  )
}

