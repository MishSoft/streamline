import LiveVideoCard from "./components/Video/LiveVideoCard";
import ShortVideos from "./components/Video/ShortVideos";
import VideoCard from "./components/Video/VideoCard";

export default function Home() {
  return (
    <main className="bg-black overflow-hidden min-h-screen py-20">
      <LiveVideoCard />
      <ShortVideos />
      <VideoCard />
    </main>
  );
}
