import React, { useState, useEffect } from "react";
import { useMusic } from "../../context/MusicContext";

const MusicList = () => {
  const { filteredSongs, currentSongId, handleSongClick } = useMusic();
  const [durations, setDurations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredSongs.length > 0) {
      setLoading(false);
    }
  }, [filteredSongs]);

  const handleLoadedMetadata = (songId, duration) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [songId]: duration,
    }));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {loading ? (
        // Display skeleton loaders while loading
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-md bg-gray-800"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse mr-4"></div>
              <div>
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-24 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))
      ) : filteredSongs.length > 0 ? (
        filteredSongs.map((song, index) => (
          <div
            key={song.id}
            className={`flex items-center justify-between p-2 cursor-pointer rounded-md ${
              song.id === currentSongId
                ? "bg-zinc-600 bg-opacity-35"
                : "hover:bg-zinc-600 hover:bg-opacity-35"
            }`}
            onClick={() => handleSongClick(song, index)}
          >
            <div className="flex items-center">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h4 className="text-md font-semibold">{song.name}</h4>
                <p className="text-xs text-gray-400">{song.artist}</p>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              {durations[song.id] ? (
                formatTime(durations[song.id])
              ) : (
                <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
              )}
            </div>

            <audio
              src={song.url}
              onLoadedMetadata={(e) =>
                handleLoadedMetadata(song.id, e.target.duration)
              }
              className="hidden"
            />
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-300">No songs found</div>
      )}
    </div>
  );
};

export default MusicList;
