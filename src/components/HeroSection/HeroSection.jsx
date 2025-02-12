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
    <section className=" text-text min-h-screen">
      <Container>
        <div className="py-16 lg:py-12 ">
          <div className="max-w-xl">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="
                 scroll-mt-7 lg:text-7xl
                sm:text-6xl
                text-6xl
                font-bold font-bricolage space-y-2 tracking-tight"
              >
                <span className="block">The ultimate</span>
                <span className="block">Platform to</span>
                <span className=" bg-gradient-to-tr bg-clip-text from-secondary via-primary to-accent text-clip overflow-hidden block font-CS text-transparent lg:text-6xl "> Host/Attend</span>
                <span className="block">live workshops.</span>
              </motion.h1>
            </div>
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 font-bricolage text-xl  leading-tight"
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
                className="font-bold text-base sm:text-lg bg-primary text-gray-900 px-4 py-3 sm:px-6 sm:py-3 hover:-translate-y-1 transition-all duration-300 transform h-14 w-96 sm:w-44  md:w-40 lg:w-44 rounded-xl"
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
