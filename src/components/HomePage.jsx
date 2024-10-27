import React, { Fragment } from "react";
import Tabs from "./shared/Tabs";
import MusicList from "./music/MusicList";
import MusicPlayer from "./music/MusicPlayer";
import { useMusic } from "../context/MusicContext";

const HomePage = () => {
  const {
    filteredSongs,
    currentSong,
    currentIndex,
    handleSongClick,
  } = useMusic();

  const currentSongData = { currentSong, currentIndex, filteredSongs };

  return (
    <Fragment>
      <div className="flex flex-col items-start md:w-1/3 py-[3%]">
        <Tabs />
        <div className="w-full h-full overflow-auto scrollbar-hide animate-slide-left">
          <MusicList />
        </div>
      </div>
      <div className="w-full h-full p-[3%] flex items-center justify-center animate-slide-right">
        <MusicPlayer
          currentSongData={currentSongData}
          playerControls={handleSongClick}
        />
      </div>
    </Fragment>
  );
};

export default HomePage;
