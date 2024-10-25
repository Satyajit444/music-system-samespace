import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import SoundPlayer from "./components/SoundPlayer";
import MusicList from "./components/musicTabs/MusicList";
import axios from "axios";

function App() {
  const [tab, setTab] = useState("for-you");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null); // Track selected song

  useEffect(() => {
    axios
      .get('https://cms.samespace.com/items/songs')
      .then((response) => setSongs(response.data.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

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
            {tab === "for-you" ? (
              <MusicList songs={forYouTracks} onSelectSong={setCurrentSong} />
            ) : (
              <MusicList songs={topTracks} onSelectSong={setCurrentSong} />
            )}
          </div>
        </div>

        <div className="w-full border border-green-900 p-[3%]">
          <SoundPlayer song={currentSong} /> {/* Pass current song to player */}
        </div>
      </div>
    </div>
  );
}

export default App;
