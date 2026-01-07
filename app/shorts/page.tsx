import React from 'react'
import ShortVideos from './components/ShortVideos'

export default function page() {
  return (
    <div className='my-20 w-full overflow-y-hidden  flex items-center flex-col justify-start'>
        <ShortVideos/>
    </div>
  )
}
