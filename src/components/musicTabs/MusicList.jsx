import React from 'react';

const MusicList = ({ songs, onSelectSong }) => {
  return (
    <ul className="space-y-4">
      {songs.map((song) => (
        <li
          key={song.id}
          className="flex items-center p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer"
          onClick={() => onSelectSong(song)} // Set the current song
        >
          <div
            className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0"
            style={{ backgroundColor: song.accent }}
          >
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <span className="text-xl font-semibold">{song.name}</span>
            <span className="text-sm text-gray-400">{song.artist}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MusicList;
