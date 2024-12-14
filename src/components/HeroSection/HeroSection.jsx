import React from "react";
import { Container } from "../index.js";
import { ArrowRight } from "lucide-react";
import Button from "../Button/Button.jsx";
import { motion } from "motion/react"

const HeroSection = () => {
  return (
      <section className="h-auto w-full bg-radial-blue text-white font-roboto py-24 bg-[#121212]">
          <Container>
              <div className="flex justify-center flex-col items-center px-[40px] py-14">
                  <div>
                      <h2 className="lg:text-6xl sm:text-4xl text-3xl font-bold text-center mb-6 leading-tight">
                          The Easest Way to Connect, Collaborate, and Learn
                      </h2>
                      <p className="text-xl sm:text-2xl mb-8 max-w-lg mx-auto text-center leading-tight">
                          Organize group meetings or get one-on-one help, all in
                          one dynamic platform.
                      </p>
                  </div>

                  <div className="text-white text-center">
                      <Button
                          name="Get Started"
                          icon={<ArrowRight className="ml-1 text-white" />}
                          aria-label="Get Started Button"
                      />
                  </div>
              </div>
          </Container>
      </section>
  );
};

export default HeroSection;
