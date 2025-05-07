import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../index";


const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="text-text min-h-dvh relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-[40px] sm:py-[120px]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bold mb-6 lg:text-6xl md:text-5xl text-4xl"
          >
            The <span className=" text-6xl">ultimate</span>{" "}
            <span className=" text-5xl ">platform to </span>
            <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent font-CS text-5xl">
              Host/Attend
            </span>{" "}
            <span className=" text-6xl md:text-7xl">live </span>
            <span className=" text-5xl">events.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          >
            GRUPIO lets you host and stream virtual events — public or private —
            and connect with professionals in real-time, straight from your
            browser.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => navigate("/auth?type=signup")}
            className="bg-primary text-black font-semibold px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-xl rounded-[30px] rounded-tr-none hover:rounded-tr-[30px] transition-all duration-300"
          >
            Register
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
