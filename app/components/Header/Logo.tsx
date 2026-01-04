import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href='/'>
      <h1 className='text-2xl text-white font-semibold'>StreamLine</h1>
    </Link>
  )
}
