import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppButton } from "../common/index.js";

function FloatingParticle() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        initialX: Math.random() * dimensions.width,
        initialY: Math.random() * dimensions.height,
        targetX: Math.random() * dimensions.width,
        targetY: Math.random() * dimensions.height,
        duration: Math.random() * 20 + 10,
      })),
    [dimensions]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle absolute w-1 h-1 rounded-full bg-blue-400/30"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            opacity: 0,
          }}
          animate={{
            x: particle.targetX,
            y: particle.targetY,
            opacity: 1,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.id * 0.1,
          }}
        />
      ))}
    </div>
  );
}

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 bg-background min-h-screen flex justify-center sm:text-center py-16 sm:py-20">
      <div className="absolute inset-0">
        <FloatingParticle />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      <div className="mx-auto relative container px-4 sm:px-6 lg:px-8 sm:text-center">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bricolage mb-6 sm:mb-8 font-medium mx-auto px-3 py-2 rounded-full border border-gray-700 bg-gray-500/10 text-text w-fit flex items-center h-fit text-xs md:text-sm"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            Now In Beta - Join Early Access
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bold mb-6 font-bricolage text-text text-[1.25rem] sm:text-5xl md:text-6xl lg:text-7xl sm:leading-tight leading-[0.9]"
          >
            <span className="inline-block">The ultimate platform to </span>
            <br className="hidden sm:block" />
            <div className="inline-block mt-2 sm:bg-[#2e1a86] rounded-lg p-2 text-4xl lg:6xl sm:text-none shadow-2xl">
              <span className="bg-gradient-to-tr from-[#2e1a86] via-[#8bb4e9] to-[#924cdd] bg-clip-text text-transparent font-CS inline-block">
                Host/Attend
              </span>
            </div>{" "}
            <span className="inline-block">live events. </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8 font-bricolage text-lg sm:text-xl md:text-2xl text-text mx-auto max-w-3xl"
          >
            Host and attend virtual or in-person events — public or private —
            and connect with professionals in real time, right from your
            browser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <AppButton
              className="rounded-full"
              buttonStyle={"manual"}
              onClick={() => navigate("/auth?type=signup")}
            >
              Let's create
            </AppButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
