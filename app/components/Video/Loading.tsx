import React from 'react'

export default function Loading() {
  return (
    <div className="grid my-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {[...Array(16)].map((_, i) => <div key={i} className="w-full aspect-video bg-zinc-800 animate-pulse rounded-xl" />)}
    </div>
  )
}
