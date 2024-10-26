import React, { useState } from "react";

const MusicList = ({ songs, onSelectSong }) => {
  // State to store each song's duration
  const [durations, setDurations] = useState({});
  const [currentSongId, setCurrentSongId] = useState(null);

  // Handle metadata load to capture duration
  const handleLoadedMetadata = (songId, duration) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [songId]: duration,
    }));
  };

  // Helper function to format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSelectSong = (song) => {
    setCurrentSongId(song.id);
    onSelectSong(song);
  };

  return (
    <div className="w-full">
      {songs?.length > 0 ? (
        songs.map((song, index) => (
          <div
            key={song.id}
            className={`flex items-center justify-between p-2 cursor-pointer rounded-md ${
              song.id === currentSongId
                ? "bg-zinc-600 bg-opacity-35"
                : "hover:bg-zinc-600 hover:bg-opacity-35"
            }`}
            onClick={() => handleSelectSong(song)}
          >
            <div className="flex items-center">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                className="w-12 h-12 mr-4 rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold">{song.name}</h4>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {/* Show duration if available, otherwise loading */}
              {durations[song.id]
                ? formatTime(durations[song.id])
                : "Loading..."}
            </div>

            {/* Hidden audio element to get duration */}
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
        <div className="p-4 text-center text-gray-500">No songs found</div>
      )}
    </div>
  );
};

export default MusicList;
