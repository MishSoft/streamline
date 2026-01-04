import React from 'react'
import SideBarBtn from './SideBarBtn'
import Logo from './Logo'
import Search from './Search'
import LoginBtn from './LoginBtn'


export default function Header() {
  return (
    <header className='px-4 md:px-10 py-5 flex items-center justify-between'>

      {/* Left Side: Side Menu Button & Logo */}
      <div className='flex items-center gap-10'>
        <SideBarBtn/>
        <Logo/>
      </div>

      {/* Middle Side: Search Input */}
      <Search/>

      {/* Right Side: Login Button */}
      <LoginBtn/>
    </header>
  )
}
