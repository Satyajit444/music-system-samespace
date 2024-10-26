import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import SoundPlayer from "./components/SoundPlayer";
import MusicList from "./components/musicTabs/MusicList";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function App() {
  const [tab, setTab] = useState("for-you");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccent, setSelectedAccent] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        setSongs(data?.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  const filteredSongs = useMemo(() => {
    return songs
      .filter((song) => (tab === "for-you" ? song : song.top_track))
      .filter(
        (song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [songs, tab, searchTerm]);

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setSelectedAccent(song.accent || "#000");
  };
  return (
    <div
      className="min-h-[100vh] h-full w-full flex main-wrapper text-white no-music-bg p-4 md:p-0"
      style={{
        background: `linear-gradient(135deg, ${selectedAccent}, ${selectedAccent}90 95%)`,
        backdropFilter: "blur(10px)",
        opacity: 0.8,
      }}
    >
      <Sidebar />
      <div className="w-full flex flex-col md:flex-row">
        <div className="flex flex-col items-start md:w-1/3  py-[3%]">
          <div className="flex justify-start w-full gap-3">
            <button
              onClick={() => {
                setTab("for-you");
                setSearchTerm("");
              }}
              className={` font-bold text-xl ${
                tab === "for-you" ? "text-white" : "text-gray-500"
              }`}
            >
              For You
            </button>
            <button
              onClick={() => {
                setTab("top-tracks");
                setSearchTerm("");
              }}
              className={`font-bold text-xl ${
                tab === "top-tracks" ? "text-white" : "text-gray-500"
              }`}
            >
              Top Tracks
            </button>
          </div>
          <div
            className="py-2 px-4 mb-4 w-full rounded-md my-4 flex justify-between items-center bg-slate-800"
            style={{
              background: `linear-gradient(135deg, ${selectedAccent}, ${selectedAccent})`,
            }}
          >
            <input
              type="text"
              placeholder="Search Song, Artist ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none"
            />
            <FaSearch size={20} color="#777" />
          </div>

          <div className="w-full h-full overflow-auto scrollbar-hide animate-slide-left">
            <MusicList songs={filteredSongs} onSelectSong={handleSongClick} />
          </div>
        </div>

        <div className="w-full h-full p-[3%] flex items-center justify-center animate-slide-right ">
          <SoundPlayer song={currentSong} />
        </div>
      </div>
    </div>
  );
}

export default App;
