"use client"
import React, { useEffect } from 'react'
import {useYoutubeStore} from "@/store/useYoutubeStore"

export default function LiveVideoCard() {
  const { liveVideos, fetchLiveVideos } = useYoutubeStore();

  useEffect(() => {
    fetchLiveVideos();
  }, []);

  if (liveVideos.length === 0) return null; // თუ ლაივები არ არის, საერთოდ არ გამოჩნდეს ეს სექცია

  return (
    <div className="p-4 bg-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
          <h2 className="text-white text-xl font-bold">Live Now</h2>
        </div>
        <button className="text-blue-500 text-sm font-bold">Show more</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {liveVideos.map((video: any) => (
          <div key={video.id.videoId} className="flex flex-col gap-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img src={video.snippet.thumbnails.high?.url} className="object-cover w-full h-full" alt="" />
              <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] px-1 rounded-sm font-bold">LIVE</span>
            </div>
            <h3 className="text-white text-xs font-bold line-clamp-2">{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
