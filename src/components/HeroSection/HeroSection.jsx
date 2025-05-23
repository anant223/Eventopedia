import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {Button} from "../index.js"


const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="dark:text-text relative overflow-hidden min-h-dvh flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full md:px-10 lg:px-32">
        <div className=" max-w-3xl text-center mx-auto flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bold mb-6 text-5xl sm:text-6xl font-bricolage "
          >
            The <span>ultimate</span> <span>platform to </span>
            <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent font-CS">
              Host/Attend
            </span>{" "}
            <span>live </span>
            <span>events.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 font-bricolage  text-lg sm:mb-8 dark:text-text max-w-2xl"
          >
            GRUPIO lets you host and stream virtual events — public or private —
            and connect with professionals in real time, right from your
            browser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <Button
              name="Register"
              handleClick={() => navigate("/auth?type=signup")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
