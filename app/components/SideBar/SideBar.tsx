import React from 'react'
import SideBarLinks from './SideBarLinks'
import Subscribe from './Subscribe'
import Explore from './Explore'

export default function SideBar() {
  return (
    <div className='fixed left-0 px-5 flex flex-col overflow-y-auto max-h-screen max-w-60'>
      {/* Side Bar Links */}
      <SideBarLinks/>

      {/* Subscribe */}
      <Subscribe/>

      {/* Explore */}
      <Explore/>
    </div>
  )
}
