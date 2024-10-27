import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { useMusic } from "../../context/MusicContext";
import style from "./MusicTab.module.css";
const MusicPlayer = () => {
  const audioRef = useRef(null);
  const { filteredSongs, currentSong, currentIndex, handleSongClick } =
    useMusic();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(true));
    } else {
      audioRef.current.pause();
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    handleSongClick(filteredSongs[nextIndex], nextIndex);
    setIsPlaying(true);
  };
  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handlePrev = () => {
    if (!currentSong) return;
    const prevIndex =
      (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    handleSongClick(filteredSongs[prevIndex], prevIndex);
    setIsPlaying(true);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    audioRef.current.muted = !isMuted;
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.addEventListener("ended", handleNext);
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
    return () => audioEl.removeEventListener("ended", handleNext);
  }, [currentSong]);

  return (
    <div className={style["player-controller"]}>
      <audio
        ref={audioRef}
        controls
        className="hidden"
        onTimeUpdate={() => setCurrentTime(audioRef?.current.currentTime)}
      >
        {currentSong && <source src={currentSong.url} type="audio/mp3" />}
      </audio>
      <div className="w-full h-full">
        <h2 className="text-2xl font-semibold text-left">
          {currentSong?.name || "No song loaded"}
        </h2>
        <p className="text-gray-400 text-sm text-left">
          {currentSong?.artist || "Unknown artist"}
        </p>
        <img
          src={
            currentSong?.cover
              ? `https://cms.samespace.com/assets/${currentSong?.cover}`
              : "https://cdn.pixabay.com/photo/2023/02/16/03/43/music-player-7792956_960_720.jpg"
          }
          alt="song_bg"
          className={style["player-image"]}
        />
        <div className={style["progress-bar"]}>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className={`${style["music-input-range"]} custom-slider`}
          />
        </div>

        <div className={style["action-ctn"]}>
          <button className={style["side-action-btn"]}>
            <BsThreeDots size={24} color="white" />
          </button>
          <div className="flex gap-x-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full focus:outline-none"
            >
              <FaBackward size={24} />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-white"
            >
              {isPlaying ? (
                <FaPause size={24} color="#333" />
              ) : (
                <FaPlay size={24} color="#333" />
              )}
            </button>
            <button onClick={handleNext} className="p-3 rounded-full">
              <FaForward size={24} />
            </button>
          </div>
          <button
            onClick={handleMuteToggle}
            className={style["side-action-btn"]}
          >
            {isMuted ? <MdVolumeOff size={24} /> : <MdVolumeUp size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
