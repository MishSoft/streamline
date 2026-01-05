import Link from 'next/link'
import React from 'react'
import { FaUser } from "react-icons/fa6";


export default function LoginBtn() {
  return (
    <Link href='/login' className='flex items-center gap-2 text-white px-2 xl:px-5 py-2 border border-gray-400 rounded-full'>
      <FaUser/>
      <h1 className='hidden xl:block'>Sign In</h1>
    </Link>
  )
}
