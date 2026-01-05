import { create } from "zustand"

interface YoutubeState {
  videos: any[];
  liveVideos: any[]; // დარწმუნდი, რომ აქ ? არ წერია
  loading: boolean;
  fetchVideos: (query: string) => Promise<void>;
  fetchLiveVideos: () => Promise<void>; // აქაც ? არ გინდა
}

const useYoutubeStore = create<YoutubeState>((set) => ({
  videos: [],
  liveVideos: [],
  loading: false,

  fetchVideos: async (query: string) => {
    console.log("1. ფუნქცია გაეშვა, query:", query);
    set({ loading: true });

    try {
      const apiKey = process.env.NEXT_PUBLIC_KEY;
      if (!apiKey) {
        console.error("2. შეცდომა: API Key ვერ მოიძებნა!");
        set({ loading: false });
        return;
      }

      console.log("3. ვაგზავნით პირველ მოთხოვნას (Search)...");
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&type=video&maxResults=12`
      );
      const searchData = await searchRes.json();

      if (searchData.error) {
        console.error("4. API შეცდომა:", searchData.error.message);
        set({ loading: false });
        return;
      }

      console.log("5. ძებნა დასრულდა, მოვიდა:", searchData.items?.length, "ვიდეო");

      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

      console.log("6. ვაგზავნით მეორე მოთხოვნას (Stats)...");
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
      );
      const statsData = await statsRes.json();

      console.log("7. ფინალური მონაცემები მზად არის:", statsData.items?.length);
      set({ videos: statsData.items || [], loading: false });

    } catch (error) {
      console.error("X. კრიტიკული შეცდომა:", error);
      set({ loading: false });
    }
  },

  fetchLiveVideos: async () => {
  set({ loading: true });
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&eventType=live&maxResults=5&key=${apiKey}`
    );
    const data = await res.json();
    // შეგიძლია შექმნა ახალი სთეითი liveVideos: [] ან გამოიყენო არსებული
    set({ liveVideos: data.items || [], loading: false });
  } catch (error) {
    console.error("Error fetching live videos:", error);
    set({ loading: false });
  }
}
}))

export default useYoutubeStore;
