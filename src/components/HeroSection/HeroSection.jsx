import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {Button} from "../index.js"


function FloatingParticle() {
  return (
    <div className=" absolute inset-0 overflow-hidden pointer-events-none">
      {
        [...Array(20)].map((_, i) => {
          return <motion.div key={i} className="particle absolute w-1 h-1 rounded-full bg-blue-400/30"
          inherit={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate= {{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}

          transition={{
            duration: Math.random() * 20 + 10,
            repeat : Number.POSITIVE_INFINITY,
            repeatType: "reverse"
          }}
          />
        })}
    </div>
  )
}

const HeroSection = () => {
  const navigate = useNavigate();

  
  return (
    <section className="relative overflow-hidden  bg-background min-h-screen flex justify-center sm:text-center py-16 sm:py-20">
      <div className=" absolute inset-0">
        <FloatingParticle />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      <div className="mx-auto relative container px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto">
          <motion.div className="font-bricolage mb-6 sm:mb-8 font-medium mx-auto px-3 py-2 rounded-full border border-gray-700 bg-gray-500/10 text-text w-fit flex items-center h-fit text-xs md:text-sm mt-8 sm:mt-12">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            Now In Beta - Join Early Access
          </motion.div>
          <motion.h1 className="font-bold mb-6 font-bricolage text-text text-6xl sm:text-5xl md:text-6xl lg:text-7xl ">
            <span className="inline-block">The ultimate platform to </span>
            <br className="hidden sm:block" />
            <div className=" inline-block mt-2 sm:bg-[#2e1a86] rounded-lg p-2 text-5xl lg:6xl sm:text-none shadow-2xl">
              <span className="bg-gradient-to-tr from-[#2e1a86] via-[#8bb4e9] to-[#924cdd] bg-clip-text text-transparent font-CS inline-block">
                Host/Attend
              </span>
            </div>{" "}
            <span className=" inline-block">live events. </span>
          </motion.h1>
          <motion.p className="mb-8 font-bricolage text-lg sm:text-xl md:text-2xl text-text mx-auto max-w-3xl">
            Host and attend virtual or in-person events — public or private —
            and connect with professionals in real time, right from your
            browser.
          </motion.p>
          <motion.div className=" transform hover:scale-105 transition-transform duration-300">
            <Button
              name="Let's create"
              handleClick={() => navigate("/auth?type=signup")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
