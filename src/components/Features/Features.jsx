import React, { useRef, useState } from "react";
import { motion } from "motion/react"
import { Card, Container } from "../index";
import {
  FaRocket,
  FaUsers,
  FaStream,
  FaChartLine,
  FaLightbulb,
  FaCogs,
} from "react-icons/fa";



const Features = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [targetX, setTargetX] = useState(0);

  const features_list = [
    {
      icon: <FaRocket className="lg:w-12 lg:h-12 mb-4 text-primary w-8 h-8" />,
      title: "Rapid Setup",
      description:
        "Get started in minutes with our easy-to-use platform. No downloads or installations required.",
    },
    {
      icon: <FaUsers className="sm:w-12 sm:h-12 mb-4 text-primary w-8 h-8" />,
      title: "Engage Audiences",
      description:
        "Interactive tools like polls, Q&A, and live chat keep your audience engaged and connected.",
    },
    {
      icon: <FaStream className="sm:w-12 sm:h-12 mb-4 text-primary w-8 h-8" />,
      title: "Seamless Streaming",
      description:
        "Stream high-quality video and audio directly from your browser, without any lag or interruptions.",
    },
    {
      icon: <FaChartLine className=" sm:w-12 sm:h-12 w-8 h-8 mb-4 text-primary" />,
      title: "Analytics Dashboard",
      description:
        "Track event performance with real-time analytics and insights to improve future events.",
    },
    {
      icon: <FaLightbulb className="sm:w-12 sm:h-12 mb-4 text-primary w-8 h-8" />,
      title: "Creative Freedom",
      description:
        "Customize your event pages and branding to match your unique style and vision.",
    },
    {
      icon: <FaCogs className="sm:w-12 sm:h-12 mb-4 text-primary w-8 h-8" />,
      title: "Advanced Tools",
      description:
        "Access advanced features like breakout rooms, screen sharing, and recording for professional events.",
    },
  ];

  React.useEffect((()=>{
    if (contentRef.current && containerRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      setTargetX(-contentWidth + containerWidth);
    }
  }),[])


  return (
    <section className=" text-text overflow-x-hidden font-bricolage py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="w-full rounded bg-[#0c1725] flex flex-col lg:flex-row lg:justify-between lg:items-center lg:px-14 lg:py-24 px-6 py-12 gap-10">
          <div className=" max-w-md lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8">
              Why Choose This?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Discover the features that make GRUPIO the preferred choice for
              hosting and attending virtual events.
            </p>
          </div>
          <div ref={containerRef} className="w-1/2 relative">
            <div className="absolute -left-1 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#0c1725] to-transparent pointer-events-none" />
            <div
              className="inset-0 bg-[#0c1725]"
              style={{ clipPath: "inset(0 -100% 0 0)" }}
            >
              <motion.div
                animate={{ x: targetX }}
                transition={{
                  duration: 30,
                  repeatType: "loop",
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex items-center px-4 gap-4  shadow-gray-400  overflow-ellipsis translate-x-[56px]"
                ref={contentRef}
              >
                {features_list.map((feature, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] md:w-[300px]"
                  >
                    <Card
                      img={feature.icon}
                      title={feature.title}
                      desc={feature.description}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;



