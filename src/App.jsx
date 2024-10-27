import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import MusicList from "./components/musicTabs/MusicList";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function App() {
  const [isTopTracks, setIsTopTracks] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
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
      .filter((song) => (!isTopTracks ? song : song.top_track))
      .filter(
        (song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [songs, isTopTracks, searchTerm]);

  const handleSongClick = (song, index) => {
    setCurrentSong(song);
    setCurrentSongId(song?.id);
    setSelectedAccent(song.accent || "#000");
    setCurrentIndex(index);
  };

  const currentSongData = { currentSong, currentIndex, filteredSongs };
  const playerControls = { handleSongClick };

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
                setIsTopTracks(false);
                setSearchTerm("");
              }}
              className={`font-bold text-xl ${
                !isTopTracks ? "text-white" : "text-gray-500"
              }`}
            >
              For You
            </button>
            <button
              onClick={() => {
                setIsTopTracks(true);
                setSearchTerm("");
              }}
              className={`font-bold text-xl ${
                isTopTracks ? "text-white" : "text-gray-500"
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
            <MusicList
              songs={filteredSongs}
              onSelectSong={handleSongClick}
              currentSongId={currentSongId}
            />
          </div>
        </div>
        <div className="w-full h-full p-[3%] flex items-center justify-center animate-slide-right ">
          <MusicPlayer
            currentSongData={currentSongData}
            playerControls={playerControls}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
