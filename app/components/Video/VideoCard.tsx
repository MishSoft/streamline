"use client"
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useYoutubeStore } from "@/store/useYoutubeStore"
import YOUTUBE_CATEGORIES from './RandomWords'
import Loading from './Loading'

const formatViews = (views: string) => {
  const num = parseInt(views);
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function VideoCard() {
  const { videos, loading, fetchVideos, nextPageToken } = useYoutubeStore();
  const [currentQuery, setCurrentQuery] = useState("");

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px', // წინასწარ იწყებს ჩატვირთვას სანამ ბოლომდე ჩახვალ
  });

  // პირველი ჩატვირთვა
  useEffect(() => {
    const randomWord = YOUTUBE_CATEGORIES[Math.floor(Math.random() * YOUTUBE_CATEGORIES.length)];
    setCurrentQuery(randomWord);
    fetchVideos(randomWord);
  }, [fetchVideos]);

  // Infinite Scroll - გაშვება მხოლოდ მაშინ თუ ბოლოში ვართ და გვაქვს ტოკენი
  useEffect(() => {
    if (inView && nextPageToken && !loading && videos.length > 0) {
      fetchVideos(currentQuery, true);
    }
  }, [inView, nextPageToken, loading, videos.length, currentQuery, fetchVideos]);

  if (loading && videos.length === 0) return <Loading />;

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-white text-xl font-bold mb-6 px-2">Recommended</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map((video: any, index: number) => (
          <div key={`${video.id}-${index}`} className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
              <img
                src={video.snippet.thumbnails.high?.url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="thumbnail"
              />
            </div>
            <div className="flex gap-3 px-1">
              <div className="h-9 w-9 rounded-full bg-zinc-800 shrink-0 overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.snippet.channelTitle}`}
                  alt="channel-avatar"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-[14px] font-bold leading-5 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-[12px] text-zinc-400 mt-1">{video.snippet.channelTitle}</p>
                <div className="flex items-center text-[12px] text-zinc-400">
                  <span>{formatViews(video.statistics?.viewCount)} views</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="h-40 flex justify-center items-center">
        {loading && (
          <div className="w-10 h-10 border-4 border-t-red-600 border-zinc-800 rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  )
}
