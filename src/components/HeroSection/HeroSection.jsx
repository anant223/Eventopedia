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
    <section className="relative overflow-hidden  bg-background min-h-screen flex justify-center items-center px-8 sm:px-18">
      <div>
        <FloatingParticle />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      <div className="mx-auto relative max-w-4xl px-4 sm:px-6 text-center lg:px-8">
        <div className=" relative">
          <motion.div className=" mb-6 sm:mb-8 font-bricolage font-medium m-[0_auto]  px-2 py-1 rounded-full border-gray-700 border bg-gray-500/10 text-text w-fit mt-20 transform-none opacity-100 flex items-center text-xs md:text-base max-w-fit overflow-hidden h-fit">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse "></div>
            Now In Beta - Join Early Access
          </motion.div>
          <motion.h1 className="font-bold mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bricolage text-text ">
            <span className="inline-block">The </span>{" "}
            <span className="inline-block">ultimate </span>{" "}
            <span className="inline-block">platform to </span>
            <br className="hidden sm:block" />
            <div className=" inline-block bg-[#2e1a86] rounded-lg p-2 shadow-2xl">
              <span className="bg-gradient-to-tr from-[#2e1a86] via-[#8bb4e9] to-[#924cdd] bg-clip-text text-transparent font-CS inline-block ">
                Host/Attend
              </span>
            </div>{" "}
            <span className="inline-block">live </span>{" "}
            <span className="inline-block">events.</span>{" "}
          </motion.h1>

          <motion.div className="mb-8 font-bricolage text-2xl  md:text-3xl max-w-3xl text-text">
            GRUPIO lets you host and stream virtual events — public or private —
            and connect with professionals in real time, right from your
            browser.
          </motion.div>

          <motion.div className="mb-6 sm:mb-8 scale-100 hover:scale-105 transition-transform duration-300">
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
