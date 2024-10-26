import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";

const SoundPlayer = ({ song, songs, songIndex, handleSongClick }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (!song) return;
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(true));
    } else {
      audioRef.current.pause();
    }
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleNext = () => {
    if (!song) return;
    const nextIndex = (songIndex + 1) % songs.length;
    handleSongClick(songs[nextIndex], nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!song) return;
    const prevIndex = (songIndex - 1 + songs.length) % songs.length;
    handleSongClick(songs[prevIndex], prevIndex);
    setIsPlaying(true);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    audioRef.current.muted = !isMuted;
  };
  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.addEventListener("ended", handleNext);
    if (song) {
      audioRef.current.src = song.url;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
    return () => audioEl.removeEventListener("ended", handleNext);
  }, [song]);

  return (
    <div className="px-8 h-full w-full max-h-[700px] max-w-[700px] md:overflow-auto">
      <audio
        ref={audioRef}
        controls
        className="hidden"
        onTimeUpdate={onTimeUpdate}
      >
        {song && <source src={song.url} type="audio/mp3" />}
        Your browser does not support the audio element.
      </audio>
      <div className="w-full h-full">
        <h2 className="text-2xl font-semibold text-left">
          {song?.name || "No song loaded"}
        </h2>
        <p className="text-gray-400 text-sm text-left">
          {song?.artist || "Unknown artist"}
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

        <div className="w-full h-2 bg-gray-700 rounded-full mt-6">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${
                (currentTime / (audioRef.current?.duration || 1)) * 100
              }%`,
            }}
          ></div>
        </div>
        <div className="mt-6 flex justify-between items-center">
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
            onClick={handleMuteToggle}
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
