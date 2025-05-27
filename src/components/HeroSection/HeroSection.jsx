import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {Button} from "../index.js"


const HeroSection = () => {
  const navigate = useNavigate();
  

  return (
    <section className="dark:text-text relative overflow-hidden min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
    
      {/* Decorative background element */}
      <div className="absolute -z-10 w-full max-w-5xl">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full">
        <motion.div
          className="max-w-3xl text-center mx-auto flex flex-col justify-center items-center"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-bold mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bricolage"
          >
            <span className="inline-block">The </span>{" "}
            <span className="inline-block">ultimate </span>{" "}
            <span className="inline-block">platform to </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent font-CS inline-block">
              Host/Attend
            </span>{" "}
            <span className="inline-block">live </span>{" "}
            <span className="inline-block">events.</span>{" "}
          </motion.h1>

          <motion.p
            className="mb-6 sm:mb-8 font-bricolage text-base sm:text-lg md:text-xl dark:text-text/80 max-w-2xl px-4"
          >
            GRUPIO lets you host and stream virtual events — public or private —
            and connect with professionals in real time, right from your
            browser.
          </motion.p>

          <motion.div
            className="mb-6 sm:mb-8 scale-100 hover:scale-105 transition-transform duration-300"
          >
            <Button
              name="Register"
              handleClick={() => navigate("/auth?type=signup")}
              className="px-8 py-3 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
          >
            <span>Already have an account?</span>
            <button
              onClick={() => navigate("/auth?type=login")}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
