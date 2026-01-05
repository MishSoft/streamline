import React from 'react'
import SideBarBtn from './SideBarBtn'
import Logo from './Logo'
import Search from './Search'
import LoginBtn from './LoginBtn'
import SearchBtn from './SearchBtn'


export default function Header() {
  return (
    <header className='fixed z-50 bg-black w-full px-5.5 xl:px-10 py-5 gap-5 flex items-center justify-between'>

      {/* Left Side: Side Menu Button & Logo */}
      <div className='flex items-center gap-2 md:gap-5'>
        <SideBarBtn/>
        <Logo/>
      </div>

      {/* Middle Side: Search Input */}
      <Search/>

      <div className='flex items-center gap-2'>
        <div className='sm:hidden block'>
          <SearchBtn />
        </div>
        {/* Right Side: Login Button */}
        <LoginBtn />
      </div>
    </header>
  )
}
