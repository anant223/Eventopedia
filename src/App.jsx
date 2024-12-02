import React from "react"
import Header from "./components/Header/Header";
import { HeroSection, Footer, Navbar } from "./components";
import Dashboard from "./pages/Dashboard";
import Hosters from "./pages/Hosters";
function App() {

  return (
    <div className="">
      <Navbar />
      <Hosters/>
    </div>
  );
}

export default App
