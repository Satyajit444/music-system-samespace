import React, { useState, useEffect } from 'react';

const MusicList = ({ songs, onSelectSong }) => {
  // State to store each song's duration
  const [durations, setDurations] = useState({});

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
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center justify-between p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectSong(song)}
        >
          <div className="flex items-center">
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.name}
              className="w-12 h-12 mr-4 rounded-md"
            />
            <div>
              <h4 className="text-lg font-semibold">{song.name}</h4>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {/* Show duration if available, otherwise loading */}
            {durations[song.id] ? formatTime(durations[song.id]) : 'Loading...'}
          </div>

          {/* Hidden audio element to get duration */}
          <audio
            src={song.url}
            onLoadedMetadata={(e) => handleLoadedMetadata(song.id, e.target.duration)}
            className="hidden"
          />
        </div>
      ))}
    </div>
  );
};

export default MusicList;
