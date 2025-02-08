import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../index";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main");
  };

  return (
    <section className=" text-text">
      <Container>
        <div className="py-16">
          <div className="max-w-96 sm:max-w-lg md:max-w-2xl lg:max-w-2xl">
            <div className="">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold font-bricolage leading-tight space-y-2"
              >
                <span className="block">The ultimate</span>
                <span className="block">Platform to</span>
                {/* The ultimate  to{" "} */}
                <span className=" bg-gradient-to-tr bg-clip-text from-secondary via-primary to-accent text-clip overflow-hidden block font-CS text-transparent "> Host/Attend</span>
                <span className="block">live workshops.</span>
              </motion.h1>
            </div>
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 text-xl sm:text-x md:text-2xl lg:text-2xl leading-tight"
              >
                GRUPIO is a professional hosting & streaming platform for
                virtual private and public events — allowing you to engage with
                professionals, all in your browser.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex"
            >
              <button
                onClick={handleClick}
                className="font-bold text-base sm:text-lg bg-primary text-gray-900 px-4 py-3 sm:px-6 sm:py-3 rounded-lg hover:-translate-y-1 transition-all duration-300 transform h-14 w-full sm:w-44  md:w-40 lg:w-44"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
