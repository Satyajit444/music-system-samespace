import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import SoundPlayer from "./components/SoundPlayer";
import MusicList from "./components/musicTabs/MusicList";

function App() {
  const [tab, setTab] = useState("for-you");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get('https://cms.samespace.com/items/songs')
      .then((response) => setSongs(response.data.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  // Filter data for "Top Tracks" and "For You"
  const topTracks = songs.filter((song) => song.top_track);
  const forYouTracks = songs.filter((song) => !song.top_track);
  return (
    <div className="h-[100vh] w-full flex">
      <Sidebar />

      <div className="border border-red-400 w-full flex">
        <div className="flex flex-col items-start w-1/2 p-[3%]">
          <div className="flex justify-start w-full gap-3">
            <button
              onClick={() => setTab("for-you")}
              className={tab === "for-you" ? "font-bold" : ""}
            >
              For You
            </button>
            <button
              onClick={() => setTab("top-tracks")}
              className={tab === "top-tracks" ? "font-bold" : ""}
            >
              Top Tracks
            </button>
          </div>
          <div className="border border-red-600 w-full h-full">
            {tab === "for-you" ? <MusicList songs={topTracks} /> : <MusicList songs={forYouTracks} />}
          </div>
        </div>

        <div className="w-full border border-green-900 p-[3%]">
          <SoundPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;
