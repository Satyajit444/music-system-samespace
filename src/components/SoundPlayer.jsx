import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md"; // Import the Volume Off icon

const SoundPlayer = ({ song }) => {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // State to track mute status

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % song.length; // Loop back to the start
      return nextIndex;
    });
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => {
      const prevIndexCalc = (prevIndex - 1 + song.length) % song.length; // Loop to the end
      return prevIndexCalc;
    });
    setIsPlaying(true);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => {
      const newMuteStatus = !prev;
      audioRef.current.muted = newMuteStatus; // Mute or unmute the audio element
      return newMuteStatus;
    });
  };

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.load();
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [song]);

  return (
    <div className="px-8 h-full w-full max-h-[700px] max-w-[700px] md:overflow-auto ">
      <audio ref={audioRef} controls className="hidden">
        <source src={song?.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="w-full h-full">
        <h2 className="text-2xl font-semibold text-left">
          {song?.name || "song.mp3"}
        </h2>
        <p className="text-gray-400 text-sm text-left">
          {song?.artist || "artist"}
        </p>
        <img
          src={
            song?.cover
              ? `https://cms.samespace.com/assets/${song.cover}`
              : "https://cdn.pixabay.com/photo/2023/02/16/03/43/music-player-7792956_960_720.jpg"
          }
          alt="song bg"
          className="h-[70%] w-full mx-auto my-4 rounded-lg"
        />
        <div className="mt-6 h-2 rounded-full">
          <div className="bg-teal-500 h-2 rounded-full w-1/2"></div>
        </div>
        <div
          className={`mt-6 flex justify-between items-center ${
            !song && "pointer-events-none"
          }`}
        >
          <button className="bg-zinc-600 bg-opacity-35 p-2 rounded-full">
            <BsThreeDots size={24} color="white" />
          </button>
          <div>
            <button
              onClick={handlePrev}
              className="p-3 rounded-full focus:outline-none"
            >
              <FaBackward size={24} />
            </button>
            <button onClick={handlePlayPause} className="p-4 rounded-full">
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button onClick={handleNext} className="p-3 rounded-full">
              <FaForward size={24} />
            </button>
          </div>
          <button
            onClick={handleMuteToggle} // Attach the mute toggle function
            className="bg-zinc-600 bg-opacity-35 p-2 rounded-full"
          >
            {isMuted ? (
              <MdVolumeOff size={24} color="white" />
            ) : (
              <MdVolumeUp size={24} color="white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundPlayer;
