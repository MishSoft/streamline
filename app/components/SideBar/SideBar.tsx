import React from 'react'
import SideBarLinks from './SideBarLinks'
import Subscribe from './Subscribe'
import Explore from './Explore'

export default function SideBar() {
  return (
    <div className='fixed left-0 top-20 items-center   h-[calc(100vh-80px)] px-5 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-20 xl:w-60  xl:max-w-60'>
      {/* Side Bar Links */}
      <SideBarLinks/>

      {/* Subscribe */}
      <Subscribe/>

      {/* Explore */}
      <Explore/>
    </div>
  )
}
