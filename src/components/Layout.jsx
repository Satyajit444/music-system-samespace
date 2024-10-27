import React from "react";
import { useMusic } from "../context/MusicContext";
import HomePage from "./HomePage";
import Sidebar from "./shared/Sidebar";

const MainLayout = () => {
  const { selectedAccent } = useMusic();

  return (
    <div
      className="min-h-[100vh] w-full flex main-wrapper text-white no-music-bg p-4 md:p-0"
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

export default MainLayout;
