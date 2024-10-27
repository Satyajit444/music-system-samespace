import React from "react";
import { FaSearch } from "react-icons/fa";

const Tabs = ({ tabData }) => {
  const { isTopTracks, setIsTopTracks, searchTerm, setSearchTerm } = tabData;
  return (
    <>
      <div className="flex justify-start w-full gap-3">
        <button
          onClick={() => {
            setIsTopTracks(false);
            setSearchTerm("");
          }}
          className={`font-bold text-xl ${
            !isTopTracks ? "text-white" : "text-gray-500"
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
            isTopTracks ? "text-white" : "text-gray-500"
          }`}
        >
          Top Tracks
        </button>
      </div>
      <div className="py-2 px-4 mb-4 w-full rounded-md my-4 flex justify-between items-center bg-neutral-800">
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
