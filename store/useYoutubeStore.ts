import { create } from "zustand"

interface YoutubeState {
  videos: any[];
  liveVideos: any[];
  shortVideos: any[];
  nextPageToken: string | null;
  loading: boolean;
  fetchVideos: (query: string, isNextPage?: boolean) => Promise<void>;
  fetchLiveVideos: () => Promise<void>;
  fetchShortVideos: () => Promise<void>;
}

export const useYoutubeStore = create<YoutubeState>((set, get) => ({
  videos: [],
  liveVideos: [],
  shortVideos: [],
  nextPageToken: null,
  loading: false,

  fetchVideos: async (query: string, isNextPage = false) => {
    // თუ უკვე იტვირთება, ახალ მოთხოვნას არ ვუშვებთ (კვოტის დასაზოგად)
    if (get().loading) return;

    set({ loading: true });

    try {
      // ⚠️ დარწმუნდი, რომ .env-ში სახელი ზუსტად ასე გიწერია
      const apiKey = process.env.NEXT_PUBLIC_KEY;
      const currentToken = isNextPage ? get().nextPageToken : null;

      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&type=video&maxResults=12${currentToken ? `&pageToken=${currentToken}` : ''}`;

      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (searchData.error) {
        console.error("API Error:", searchData.error.message);
        set({ loading: false });
        return;
      }

      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
      );
      const statsData = await statsRes.json();

      set({
        // თუ შემდეგი გვერდია, ახალ ვიდეოებს ვამატებთ ძველების ბოლოში
        videos: isNextPage ? [...get().videos, ...statsData.items] : statsData.items,
        nextPageToken: searchData.nextPageToken || null,
        loading: false,
      });

    } catch (error) {
      console.error("Critical Error:", error);
      set({ loading: false });
    }
  },

  fetchLiveVideos: async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&eventType=live&q=live&maxResults=5&key=${apiKey}`
      );
      const data = await res.json();
      set({ liveVideos: data.items || [] });
    } catch (error) {
      console.error("Live fetch error:", error);
    }
  },

  fetchShortVideos: async () => {
    set({ loading: true }); // დავიწყოთ ჩატვირთვა
    try {
      const apiKey = process.env.NEXT_PUBLIC_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&q=shorts&maxResults=10&key=${apiKey}`
      );
      const data = await res.json();

      if (data.error) {
        console.error("API Error:", data.error.message);
        set({ loading: false });
        return;
      }

      set({ shortVideos: data.items || [], loading: false });
    } catch (error) {
      console.error("Shorts fetch error:", error);
      set({ loading: false });
    }
  }
}))
