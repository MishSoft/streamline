import LiveVideoCard from "./components/Video/LiveVideoCard";
import VideoCard from "./components/Video/VideoCard";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <LiveVideoCard />
      <VideoCard />
    </main>
  );
}
