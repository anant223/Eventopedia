import React, {useState } from "react";
import { motion } from "motion/react";
import { Bolb } from "../index.js";
import {features} from "../../utils/constant.js"

const Features = () => {
  const [info, setInfo] = useState( {
    icon: features[0].icon,
    title: features[0].title ,
    desc : features[0].description
  })
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const radius = screenWidth > 640 ? 250 : 140; 
  const handleClickInfo = (clickInfo) => {
    setInfo(
      {
        icon: clickInfo.icon,
        title: clickInfo.title,
        desc: clickInfo.description
      }
    )
  }
 



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
        <div className="w-full mx-auto p-2 h-[40vh] sm:min-h-[100vh] relative">
          <div className="from-[#0c1725] via-[#0e1c2f] to-[#0c1725] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(46,_26,_134,_0.3)_0px_10px_30px] w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] absolute rounded-full p-4 bg-gradient-to-br left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-text flex justify-center flex-col items-center">
            <div className=" sm:mb-4 mb-2">{<info.icon color="#8bb4e9" />}</div>
            <div className="">
              <h1 className="sm:text-[1.5vw] text-[2.5vw] font-bold sm:mb-4 mb-2">{info.title}</h1>
              <p className="sm:text-[1vw] mb-4 text-[2vw]">{info.desc}</p>
            </div>
          </div>
          {features.map((feature, index) => {
            const angle = (index * 360) / features.length;
            const angleInRadians = (angle * Math.PI) / 180;

            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            return (
              <div
                onClick={() => handleClickInfo(feature)}
                key={feature.id}
                className="absolute flex flex-col items-center justify-center text-text cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Bolb icon={<feature.icon color="#8bb4e9" />} />
                <span className=" sm:text-[1.1vw] text-[2.5vw]">{feature.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
