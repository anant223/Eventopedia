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
    <div className=" bg-gray-900 min-h-screen flex flex-col w-full">
        <HeroSection />
        <Features />
        <HowItWork />
    </div>
  );
};

export default Home;
