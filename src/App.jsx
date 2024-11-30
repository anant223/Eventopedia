import React from "react"
import Header from "./components/Header/Header";
import { HeroSection, Footer, Navbar } from "./components";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Event from "./pages/Event"
function App() {

  return (
    <div className="">
      <Navbar />
      <Event/>
    </div>
  );
}

export default App
