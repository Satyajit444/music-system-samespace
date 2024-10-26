import React, { useEffect, useRef, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

const SoundPlayer = ({ song }) => {
  console.log("🚀 ~ SoundPlayer ~ song:", song);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.load();

      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [song]);

  return (
    <div className="px-8 h-full w-full max-h-[700px] max-w-[700px] overflow-auto ">
      <audio ref={audioRef} controls className="hidden">
        <source src={song?.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className=" w-full h-full">
        <h2 className="text-2xl font-semibold text-left">
          {song?.name || "song.mp3"}
        </h2>
        <p className="text-gray-600 text-sm text-left">
          {song?.artist || "artist"}
        </p>
        <img
          src={
            song?.cover
              ? `https://cms.samespace.com/assets/${song.cover}`
              : "https://cdn.pixabay.com/photo/2023/02/16/03/43/music-player-7792956_960_720.jpg"
          }
          alt="song bg"
          className=" h-[70%] w-full mx-auto rounded-lg"
        />
        <div className="mt-6  h-2 rounded-full">
          <div className="bg-teal-500 h-2 rounded-full w-1/2"></div>
        </div>
        <div
          className={`mt-6 flex justify-center items-center ${
            !song && "pointer-events-none"
          }`}
        >
          <button
            onClick={handleNext}
            className="p-3 rounded-full  focus:outline-none"
          >
            <FaBackward size={24} />
          </button>
          <button onClick={handlePlayPause} className="p-4 rounded-full ">
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button onClick={handlePrev} className="p-3 rounded-full ">
            <FaForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundPlayer;
