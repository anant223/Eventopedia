import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Card, Container, Bolb } from "../index.js";
import {
  FaRocket,
  FaUsers,
  FaStream,
  FaChartLine,
  FaLightbulb,
  FaCogs,
} from "react-icons/fa";
import {
  BarChart3,
  Calendar,
  Globe,
  MessageSquare,
  Shield,
  Users,
  Video,
  Zap,
} from "lucide-react";

const Features = () => {
  const containerRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: Video,
      title: "HD Streaming",
      description:
        "Crystal clear video quality with adaptive bitrate streaming that adjusts to your audience's connection.",
      highlights: ["4K Support", "Low Latency", "Auto Quality"],
    },
    {
      id: 2,
      icon: Users,
      title: "Unlimited Attendees",
      description:
        "Host events for 10 or 10,000 people. Our infrastructure scales automatically with your audience.",
      highlights: ["No Limits", "Auto Scaling", "Global CDN"],
    },
    {
      id: 3,
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and security protocols keep your events and data completely protected.",
      highlights: ["End-to-End Encryption", "SOC 2 Compliant", "GDPR Ready"],
    },
    {
      id: 4,
      icon: MessageSquare,
      title: "Interactive Chat",
      description:
        "Real-time messaging, polls, Q&A sessions, and reactions to keep your audience engaged.",
      highlights: ["Live Polls", "Q&A Sessions", "Emoji Reactions"],
    },
    {
      id: 5,
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Detailed insights into attendance, engagement, and performance metrics for every event.",
      highlights: ["Real-time Data", "Export Reports", "Audience Insights"],
    },
    {
      id: 6,
      icon: Globe,
      title: "Global Reach",
      description:
        "Broadcast to audiences worldwide with our global content delivery network and multi-language support.",
      highlights: ["Multi-language", "Global CDN", "Time Zone Support"],
    },
    {
      id: 7,
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Intelligent scheduling system with calendar integration and automated reminder notifications.",
      highlights: ["Calendar Sync", "Auto Reminders", "Time Zone Detection"],
    },
    {
      id: 8,
      icon: Zap,
      title: "Instant Setup",
      description:
        "Go live in seconds with our one-click streaming technology. No downloads or installations required.",
      highlights: ["Browser-based", "One-click Start", "No Downloads"],
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
            More Than Just creating Events
          </motion.div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-6 max-w-4xl mx-auto leading-tight">
            Everything you need to{" "}
            <div className="inline-block bg-[#2e1a86] rounded-lg p-2 shadow-2xl">
              <span className="bg-gradient-to-tr from-[#2e1a86] via-[#8bb4e9] to-[#924cdd] bg-clip-text text-transparent font-CS">
                create magic
              </span>
            </div>{" "}
          </motion.h2>

          <motion.p className="text-lg sm:text-xl md:text-2xl text-text mx-auto max-w-3xl leading-relaxed">
            Powerful features designed to make your virtual events
            unforgettable. Hover over the orbs to explore.
          </motion.p>
        </motion.div>
        <div className="w-full mx-auto max-w-5xl p-2 h-[100vh] relative">
          {features.map((feature, index) => {
            const angle = (index * 360) / features.length;
            const angleInRadians = (angle * Math.PI) / 180;
            const radius = 250;

            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            return (
              <div
                key={feature.id}
                className="absolute flex flex-col items-center justify-center text-white"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Bolb icon={<feature.icon/>}  />
                <span>{feature.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
