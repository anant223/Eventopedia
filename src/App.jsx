import React from "react"
import Header from "./components/Header/Header";
import { HeroSection } from "./components";
import Home from "./pages/Home";

function App() {

  return (
    <div className="bg-gray-950">
      <Header/>
      <Home/>
    </div>
  );
}

export default App
