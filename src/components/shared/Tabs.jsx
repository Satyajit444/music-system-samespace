import React from "react";
import { FaSearch } from "react-icons/fa";
import { useMusic } from "../../context/MusicContext";
import style from "./shared.module.css";

const Tabs = () => {
  const { searchTerm, isTopTracks, setIsTopTracks, setSearchTerm } = useMusic();
  return (
    <>
      <div className={style["tab-ctn"]}>
        <button
          onClick={() => {
            setIsTopTracks(false);
            setSearchTerm("");
          }}
          className={`font-bold text-xl ${
            !isTopTracks ? "text-white" : "opacity-50"
          }`}
        >
          For You
        </button>
        <button
          onClick={() => {
            setIsTopTracks(true);
            setSearchTerm("");
          }}
          className={`font-bold text-xl ${
            isTopTracks ? "text-white" : "opacity-50"
          }`}
        >
          Top Tracks
        </button>
      </div>
      <div className={style["search-bar-ctn"]}>
        <input
          type="text"
          placeholder="Search Song, Artist ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none"
        />
        <FaSearch size={20} color="#777" />
      </div>
    </>
  );
};

export default Tabs;
