import React from "react";
import { FaUserCircle } from "react-icons/fa";
import style from "./shared.module.css";

const Sidebar = () => {
  return (
    <div className={style["sidebar-ctn"]}>
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
