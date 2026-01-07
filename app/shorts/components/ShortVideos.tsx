"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useYoutubeStore } from '@/store/useYoutubeStore'
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots, FaShare } from "react-icons/fa";
import YouTube from 'react-youtube';

export default function ShortVideos() {
  const { shortVideos, fetchShortVideos, loading } = useYoutubeStore();
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchShortVideos();
  }, [fetchShortVideos]);

  const scrollToNext = (index: number) => {
    if (containerRef.current) {
      const nextVideo = containerRef.current.children[index + 1];
      if (nextVideo) {
        nextVideo.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar">
      {shortVideos?.map((video, index) => (
        <VideoItem
          key={video.id.videoId}
          video={video}
          index={index}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onVideoEnd={() => scrollToNext(index)}
        />
      ))}
    </div>
  )
}

function VideoItem({ video, isMuted, setIsMuted, onVideoEnd }: any) {
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current;
        if (!player) return;

        try {
          if (entry.isIntersecting) {
            if (typeof player.playVideo === 'function') player.playVideo();
          } else {
            if (typeof player.pauseVideo === 'function') player.pauseVideo();
          }
        } catch (err) {
          console.log("Player not ready yet");
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // ხმის მართვა
  useEffect(() => {
    const player = playerRef.current;
    if (player && typeof player.mute === 'function') {
      isMuted ? player.mute() : player.unMute();
    }
  }, [isMuted]);

  return (
    <div ref={videoRef} className="h-screen w-full flex items-center justify-center overflow-hidden snap-start relative">
      <div className="relative h-[90%] aspect-9/16 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">

        <YouTube
          videoId={video.id.videoId}
          onReady={(e) => {
            playerRef.current = e.target;
            if (isMuted) e.target.mute();
          }}
          onStateChange={(e) => {
            if (e.data === 0) onVideoEnd();
          }}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1 }
          }}
          className="w-full h-full pointer-events-none"
        />

        {/* Mute/Unmute Layer */}
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => setIsMuted(!isMuted)} />

        {/* შენი დიზაინის ელემენტები */}
        <div className="absolute bottom-6 left-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.snippet.channelTitle}`} className="w-8 h-8 rounded-full border" alt="" />
            <span className="text-white font-bold text-sm">@{video.snippet.channelTitle}</span>
          </div>
          <p className="text-white text-xs line-clamp-2 pr-12">{video.snippet.title}</p>
        </div>

        <div className="absolute right-4 bottom-20 z-20 flex flex-col gap-6 text-white">
          <button className="flex flex-col items-center"><AiFillLike size={28} /><span className="text-[10px]">Like</span></button>
          <button className="flex flex-col items-center"><FaCommentDots size={28} /><span className="text-[10px]">Chat</span></button>
          <button className="flex flex-col items-center"><FaShare size={28} /><span className="text-[10px]">Share</span></button>
        </div>
      </div>
    </div>
  );
}
