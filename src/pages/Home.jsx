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
    <div className="bg-gray-950 max-w-7xl px-2 sm:px-4 lg:px-6">
      <HeroSection />
      <Features />
      <HowItWork />
      <Footer />
    </div>
  );
};

export default Home;
