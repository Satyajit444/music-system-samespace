import React, { useState, useEffect } from "react";
import { useMusic } from "../../context/MusicContext";
import style from "./MusicTab.module.css";
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
    <div className={style["list-ctn"]}>
      {loading ? (
        // Display skeleton loaders while loading
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={style["skeleton-ctn"]}>
            <div className="flex items-center">
              <div className={style["skeleton-main"]}></div>
              <div>
                <div className={style["skeleton-child"]}></div>
                <div className={style["skeleton-sub-child"]}></div>
              </div>
            </div>
            <div className={style["skeleton-ruler"]}></div>
          </div>
        ))
      ) : filteredSongs.length > 0 ? (
        filteredSongs.map((song, index) => (
          <div
            key={song.id}
            className={` ${style["list-child"]} ${
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
                <div className={style["skeleton-duration"]}></div>
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
