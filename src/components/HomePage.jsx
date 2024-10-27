import React, { Fragment } from "react";
import Tabs from "./shared/Tabs";
import MusicList from "./music/MusicList";
import MusicPlayer from "./music/MusicPlayer";
import { useMusic } from "../context/MusicContext";
import useMedia from "use-media";

const HomePage = () => {
  const isSmall = useMedia({ maxWidth: "600px" });
  const isMedium = useMedia({ minWidth: "601px", maxWidth: "1024px" });
  const isLarge = useMedia({ minWidth: "1025px" });

  const { filteredSongs, currentSong, currentIndex, handleSongClick } =
    useMusic();

  const currentSongData = { currentSong, currentIndex, filteredSongs };

  return (
    <div className="flex md:flex-row flex-col-reverse items-start justify-between w-full h-full">
      <div className="flex flex-col items-start md:w-1/3 w-full py-[3%]">
        <Tabs />
        <div className="w-full h-full overflow-auto scrollbar-hide animate-slide-left">
          <MusicList />
        </div>
      </div>
      <div className="w-full h-full p-[3%] pt-[5%] flex items-center justify-center animate-slide-right">
        <MusicPlayer
          currentSongData={currentSongData}
          playerControls={handleSongClick}
        />
      </div>
    </div>
  );
};

export default HomePage;
