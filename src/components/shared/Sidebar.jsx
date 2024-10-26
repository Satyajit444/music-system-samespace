import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="md:flex flex-col justify-between h-screen w-1/6 py-[2.2%] px-[2%] hidden">
      <img
        src={
          `https://newsroom.spotify.com/wp-content/themes/ftr/assets/images/spotify-logo.png` ||
          ""
        }
        alt="spotify_logo"
        className="w-32"
      />
      <button>
        <FaUserCircle size={30} color="white" />{" "}
      </button>
    </div>
  );
};

export default Sidebar;
