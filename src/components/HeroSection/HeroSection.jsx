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
    <section className="text-text min-h-screen">
      <Container>
        <div className="py-2 md:py-4 lg:py-8">
          <div className="max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="scroll-mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold font-bricolage tracking-tight space-y-2"
            >
              <span className="block">The ultimate</span>
              <span className="block">Platform to</span>
              <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent block font-CS">
                Host / Attend
              </span>
              <span className="block">live workshops.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-base sm:text-lg lg:text-xl font-bricolage leading-snug text-muted-foreground"
            >
              GRUPIO is a professional hosting & streaming platform for virtual
              private and public events — allowing you to engage with
              professionals, all in your browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={handleClick}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-gray-900 text-base sm:text-lg font-bold transition-all duration-300 hover:-translate-y-1"
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
