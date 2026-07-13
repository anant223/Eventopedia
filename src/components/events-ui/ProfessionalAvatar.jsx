import React, { useState } from 'react'
import AppButton from '../common/buttons/AppButton';
import {motion} from "framer-motion";

const ProfessionalAvatar = ({ professional, position, isHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: position.z,
      }}
      initial={{
        opacity: 0,
        y: 50
      }}
      animate= {{
        opacity: 1,
        y: [0, -10, 0]
      }}
      // animate={{
      //   opacity : 1,
      //   rotateY : 0,
      //   scale: isHovered ? 1 : 0.9

      // }}

      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}

      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className=" relative">
        {professional.online && (
          <motion.div
            className={`rounded-full border-2 w-24 h-24 absolute  -top-1 -right-1 backdrop-blur-xl overflow-hidden ${professional?.online ? "border-green-500" : " border-gray-500/50"}`}
          >
            <div className=" inset-0 bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full rounded-full flex justify-center items-center">
              <span className=" text-text text-lg font-bold">
                {professional.name[0]}
              </span>
            </div>
          </motion.div>
        )}
      </div>
      {isHovered && (
        <motion.FlexCard
          size="sm"
          className="border hidden  border-gray-600/50"
        >
          <div className=" font-roboto w-full flex justify-center flex-col items-center">
            <h3 className="text-sm font-bold text-text ">
              {professional.name}
            </h3>
            <p className="text-xs text-gray-400 font-semibold mb-3">
              {professional?.title}
            </p>
            <p className="text-xs text-text font-semibold mb-3">
              {professional?.company}
            </p>
          </div>
          <div className=" flex gap-2 items-center flex-wrap mb-4 text-xs w-full mx-auto justify-center">
            {professional.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500 px-2 py-1 bg-opacity-75 rounded-2xl text-text"
              >
                {skill}
              </span>
            ))}
          </div>
          <AppButton className="mx-auto w-full" buttonStyle="manual" size="sm">
            Follow
          </AppButton>
        </motion.FlexCard>
      )}
    </motion.div>
  );
};

export default ProfessionalAvatar