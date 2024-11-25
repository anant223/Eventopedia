import React from 'react'
import {Container} from "../index.js"
import { ArrowRight } from "lucide-react";
import Button from '../Button/Button.jsx';

const HeroSection = () => {
  return (
    <section className="min-h-[85vh]  flex justify-center items-center bg-gradient-to-br bg-gray-950 text-white">
      <Container>
        <div className=" py-12 text-center mb-8 bg-blend-saturation backdrop:blur-md px-[134px]">
          <h2 className="sm:text-6xl font-bold mb-6 leading-tight text-[42px]">
            {" "}
            Connect, Collaborate, and Learn
          </h2>
          <p className="sm:text-2xl mb-8 max-w-2xl mx-auto text-[18px]">
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