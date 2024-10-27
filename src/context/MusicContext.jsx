import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [isTopTracks, setIsTopTracks] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccent, setSelectedAccent] = useState("#000");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get("https://cms.samespace.com/items/songs");
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
    setSelectedAccent(song.accent);
    setCurrentIndex(index);
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        isTopTracks,
        currentSong,
        currentIndex,
        currentSongId,
        searchTerm,
        selectedAccent,
        setIsTopTracks,
        setSearchTerm,
        handleSongClick,
        filteredSongs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
