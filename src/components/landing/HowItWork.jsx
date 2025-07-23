import React from 'react'
import { Card,  } from "../index.js";
import { ArrowRight, Calendar, CheckCircle, Settings, Users, Video, Zap } from 'lucide-react';
import { motion } from 'framer-motion';


const HowItWork = () => {
  const howItWorks = [
    {
      icon: Calendar,
      title: "Create Event",
      description:
        "Set up your virtual event in minutes with our intuitive builder",
    },
    {
      icon: Users,
      title: "Invite People",
      description: "Share your event link or send personalized invitations",
    },
    {
      icon: Video,
      title: "Go Live",
      description: "Stream directly from your browser with HD quality",
    },
    {
      icon: Zap,
      title: "Engage",
      description: "Interact with your audience through chat, polls, and Q&A",
    },
  ];

  return (
    <section className="relative bg-background overflow-hidden font-bricolage py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="mx-auto relative container px-4 sm:px-6 lg:px-8 text-center">
        <motion.div className="text-center mb-16 sm:mb-20">
          <motion.div className="font-bricolage mb-6 sm:mb-8 font-medium mx-auto px-3 py-2 rounded-full border border-gray-700 bg-gray-500/10 text-text w-fit flex items-center text-sm md:text-base">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            Simple Process
          </motion.div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-6 max-w-4xl mx-auto leading-tight">
            From idea to{" "}
            <div className="inline-block bg-[#2e1a86] rounded-lg p-2 shadow-2xl">
              <span className="bg-gradient-to-tr from-[#2e1a86] via-[#8bb4e9] to-[#924cdd] bg-clip-text text-transparent font-CS">
                live event
              </span>
            </div>{" "}
            in 4 simple steps
          </motion.h2>

          <motion.p className="text-lg sm:text-xl md:text-2xl text-text mx-auto max-w-3xl leading-relaxed">
            No complex setup, no technical knowledge required. Just pure
            simplicity.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {howItWorks?.map((card, i) => (
            <div key={i} className="relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-tr from-[#2e1a86] to-[#924cdd] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                {i + 1}
              </div>
              <Card
                img={<card.icon/>}
                desc={card.description}
                title={card.title}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWork
