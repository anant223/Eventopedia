import React from "react";
import { Container } from "../index.js";
import { ArrowRight } from "lucide-react";
import Button from "../Button/Button.jsx";
import { motion } from "motion/react"
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="isolate bg-radial-blue text-white font-roboto bg-[#121212] py-12 relative pt-[100px]">
      <Container>
        <div className="md:min-h-[37rem] min-h-[31rem] py-24 mt-[-2px] mb-24">
          <div className="hidden sm:flex sm:justify-center">
            <div className="mb-8 rounded-2xl px-3  py-1 text-sm/6 text-gray-200 ring-1 hover:ring-gray-900/20">
              Looking for seed funding.
              <Link to="#"  className="font-semibold text-white">
                <span className=" relative inset-0 mr-1" aria-hidden="true">
                </span>
                Explore more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Connect, Collaborate, Learn and Grow
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-200 sm:text-xl/8 lg:max-w-2xl mx-auto">
              Organize group meetings workshop or get one-on-one help, all in
              one dynamic platform.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              name="Get Started"
              icon={<ArrowRight className="ml-1 text-white w-8" />}
              aria-label="Get Started Button"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
