import React from "react";
import { useMusic } from "../context/MusicContext";
import HomePage from "./HomePage";
import Sidebar from "./shared/Sidebar";
import style from "./main.module.css";
const Layout = () => {
  const { selectedAccent } = useMusic();

  return (
    <div
      className={`${style["main-layout"]} main-wrapper`}
      style={{
        background: `linear-gradient(135deg, ${selectedAccent}, ${selectedAccent}90 95%)`,
        backdropFilter: "blur(10px)",
        opacity: 0.8,
      }}
    >
      <Sidebar />
      <HomePage />
    </div>
  );
};

export default Layout;
