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
    <div className="bg-gray-950">
      <Container>
        <HeroSection />
        <Features />
        <HowItWork />
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
