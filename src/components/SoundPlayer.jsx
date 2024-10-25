import React, { useEffect, useRef } from 'react';

const SoundPlayer = ({ song }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.pause(); // Pause any currently playing song
      audioRef.current.load();  // Load the new song
      audioRef.current.play();  // Automatically play the new song
    }
  }, [song]);

  if (!song) {
    return <div className="text-center text-gray-400">Select a song to play</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div
          className="w-16 h-16 rounded-md overflow-hidden mr-4"
          style={{ backgroundColor: song.accent }}
        >
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt={song.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{song.name}</h3>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>
      <audio ref={audioRef} controls className="w-full mt-4">
        <source src={song.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SoundPlayer;
