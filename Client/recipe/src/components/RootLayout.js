import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export const RootLayout = () => {
  return (
    <div>
        <Navigation/>
        {/* <MainNavigation/> */}
        <main><Outlet/></main>
        {/* all child componenet of '/ ' will be rendered here*/}
    </div>
  )
}
