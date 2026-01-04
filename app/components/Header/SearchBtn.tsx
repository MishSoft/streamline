import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBtn() {
  return (
    <button aria-label='Search' className='border-none outline-none cursor-pointer text-white px-5'>
      <IoSearchOutline size={20}/>
    </button>
  )
}
