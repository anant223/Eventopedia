import React from 'react'
import {Container} from "../index.js"
import { ArrowRight } from "lucide-react";
import Button from '../Button/Button.jsx';


const HeroSection = () => {
  return (
    <section className=" min-h-[85vh] flex justify-center items-center bg-gradient-to-br bg-gray-950 text-white ">
      <Container>
        <div className="text-center mb-8 bg-blend-saturation backdrop:blur-md">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            {" "}
            Connect, Collaborate, and Learn
          </h2>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            {" "}
            Organize group meetings or get one-on-one help, all in one dynamic
            platform.
          </p>
          <Button name="Get Started" icon={<ArrowRight className="ml-2" />} />
        </div>
      </Container>
    </section>
  );
}

export default HeroSection