"use client"
import React, { useState } from 'react'
import SearchBtn from './SearchBtn'
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <div className='flex items-center justify-between max-w-xl w-xl bg-gray-950 border border-gray-800 rounded-full'>
      <div className='flex items-center'>
        {isActive && <span className='pl-5'><IoSearchOutline size={20} className='text-white ' /></span>}
        <input
         onFocus={() => setIsActive(true)}
         onBlur={() => setIsActive(false)}
          type="search" placeholder='Search' className={`${isActive ? "px-2.5" : "px-5"} outline-none text-white`} />
      </div>
      <div className='bg-gray-900 rounded-r-full py-2.5 flex items-center justify-center'>
        <SearchBtn />
      </div>
    </div>
  )
}
