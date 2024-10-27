import React from "react";
import "./App.css";
import { MusicProvider } from "./context/MusicContext";
import Layout from "./components/Layout";

function App() {
  return (
    <MusicProvider>
      <Layout />
    </MusicProvider>
  );
}

export default App;
