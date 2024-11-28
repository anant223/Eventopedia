import React from "react";
import {
  Features,
  Footer,
  HeroSection,
  HowItWork,
} from "../components/index.js";
import { Container } from "../components/index.js";

const Home = () => {
  return (
    <div className="bg-gray-950 max-w-7xl mx-auto">
        <HeroSection />
        <Features />
        <HowItWork />
        <Footer />
    </div>
  );
};

export default Home;
