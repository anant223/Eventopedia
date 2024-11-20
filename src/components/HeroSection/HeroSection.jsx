import React from 'react'
import {Container} from "../index.js"

const HeroSection = () => {
  return (
    <section className=" min-h-[85vh] py-12 bg-gradient-to-br bg-gray-950 text-white">
      <Container>
        <div className="text-center mb-8 `bg-blend-saturation backdrop:blur-md">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            {" "}
            Connect, Collaborate, and Learn
          </h2>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            {" "}
            Organize group meetings or get one-on-one help, all in one dynamic
            platform.
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 hover:from-yellow-500 hover:to-pink-600 text-lg px-8 py-3 rounded-full">
            Get Started
          </button>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection