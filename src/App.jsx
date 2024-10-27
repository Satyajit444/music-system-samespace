// App.js
import React from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import HomePage from "./components/HomePage";
import { MusicProvider, useMusic } from "./context/MusicContext";

function App() {
  const { selectedAccent = "#333" } = useMusic();

  return (
    <MusicProvider>
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
    </MusicProvider>
  );
}

export default App;
