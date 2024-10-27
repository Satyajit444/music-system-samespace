import React from "react";
import "./App.css";
import { MusicProvider } from "./context/MusicContext";
import MainLayout from "./components/Layout";

function App() {
  return (
    <MusicProvider>
      <MainLayout />
    </MusicProvider>
  );
}

export default App;
