"use client"
import React, { useEffect } from 'react'
import useYoutubeStore from "@/store/useYoutubeStore"
import YOUTUBE_CATEGORIES from './RandomWords';
import Loading from './Loading';

const formatViews = (views: string) => {
  const num = parseInt(views);
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function VideoCard() {
  const { videos, loading, fetchVideos } = useYoutubeStore();

  useEffect(() => {
    const randomWords = YOUTUBE_CATEGORIES[Math.floor(Math.random() * YOUTUBE_CATEGORIES.length)];
    fetchVideos(randomWords);
  }, []); // [] ნიშნავს რომ მხოლოდ ერთხელ გაეშვება ჩატვირთვისას

  if (loading && videos.length === 0) return <Loading />;

  return (
    <div className="p-4 bg-black">
      <h2 className="text-white text-xl font-bold mb-4">Recommended</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map((video: any) => (
          <div key={video.id} className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
              <img
                src={video.snippet.thumbnails.high?.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="thumbnail"
              />
            </div>
            <div className="flex gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-800 shrink-0 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.snippet.channelTitle}`} alt="avatar" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-[14px] font-bold leading-5 line-clamp-2">{video.snippet.title}</h3>
                <p className="text-[12px] text-zinc-400">{video.snippet.channelTitle}</p>
                <p className="text-[12px] text-zinc-400">{formatViews(video.statistics?.viewCount)} views</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
