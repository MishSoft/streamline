"use client"
import {useYoutubeStore} from '@/store/useYoutubeStore';
import React, { useEffect } from 'react'

export default function ShortVideos() {
  // 1. გამოიძახე სწორი მასივი და ფუნქცია
  const { shortVideos, fetchShortVideos, loading } = useYoutubeStore();

  useEffect(() => {
    // 2. გამოიძახე შორთების ფუნქცია
    fetchShortVideos();
  }, []);

  if (shortVideos.length === 0) return null;

  return (
    <div className="p-4 bg-black">
      <h2 className="text-white text-xl font-bold mb-4">Shorts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {shortVideos.map((video: any) => (
          <div key={video.id.videoId || video.id} className="flex flex-col gap-2 group cursor-pointer">
            <div className="relative aspect-9/16 rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src={video.snippet.thumbnails.high?.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="short-thumbnail"
              />
            </div>
            <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">
              {video.snippet.title}
            </h3>
            <p className="text-[12px] text-zinc-400">1.2M views</p>
          </div>
        ))}
      </div>
    </div>
  )
}
