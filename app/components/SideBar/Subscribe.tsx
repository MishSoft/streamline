import Link from 'next/link'
import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";

export default function Subscribe() {
  return (
    <div className='p-5 flex flex-col items-start border-b border-white/30 gap-2'>
      <h2 className='text-white text-left'>
        Sign in to like videos,
        comment, and subscribe
      </h2>
      <Link href='/login' className='p-2 gap-2 w-auto flex items-center rounded-full border border-white/30 text-blue-400'>
        <FaRegCircleUser size={20} />
        Sign In
      </Link>
    </div>
  )
}
