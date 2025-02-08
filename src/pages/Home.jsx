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
    <div className=" bg-background min-h-screen flex flex-col w-full bg-bgColor">
        <HeroSection />
        <Features />
        <HowItWork />
    </div>
  );
};

export default Home;
 