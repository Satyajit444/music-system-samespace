import React from "react";
import Tabs from "./shared/Tabs";
import MusicList from "./music/MusicList";
import MusicPlayer from "./music/MusicPlayer";
import { useMusic } from "../context/MusicContext";
import style from "./main.module.css";

const HomePage = () => {
  const { filteredSongs, currentSong, currentIndex, handleSongClick } =
    useMusic();

  const currentSongData = { currentSong, currentIndex, filteredSongs };

  return (
    <div className={style["main-container"]}>
      <div className={style["tab-list-ctn"]}>
        <Tabs />
        <div className={`${style["music-list-ctn"]} animate-slide-left`}>
          <MusicList />
        </div>
      </div>
      <div className={`${style["music-player-ctn"]} animate-slide-right`}>
        <MusicPlayer
          currentSongData={currentSongData}
          playerControls={handleSongClick}
        />
      </div>
    </div>
  );
};

export default HomePage;
