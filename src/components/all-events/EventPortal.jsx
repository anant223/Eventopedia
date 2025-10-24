import React, { useState } from 'react'
import { Eye} from 'lucide-react';
import { motion } from 'framer-motion';


const EventPortal = ({
  event,
  isHighlighted,
  onEnter,
  connectedIntrests = 1,
  isHovered,
  onHover,
}) => {
  return (
    <motion.div
      className="absolute cursor-pointer "
      style={{
        left: `${event?.x}px`,
        top: `${event?.y}px`,
        transform: "translate(-50%, -50%)",
        zIndex: isHovered ? 40 : 20,
      }}
      initial={{
        scale: 0,
        rotateY: -180,
        opacity: 0,
      }}
      animate={{
        scale: isHovered ? 1.3 : isHighlighted ? 1.1 : 1,
        rotateY: 0,
        rotateX: isHovered ? 10 : 0,
        opacity: isHighlighted ? 1 : connectedIntrests.length > 0 ? 0.4 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={(e) => onHover(event, e)}
      onMouseLeave={() => onHover(null)}
      onClick={onEnter}
    >
      <div className="relative ">
        <motion.div
          className={`rounded-full w-24 h-24 border-4 shadow-[0_0_30px_rgba(239,68,68,0.5)] backdrop-blur-xl ${event.status === "live" ? " border-red-500" : event.status === "upcoming" ? "border-blue-500" : " border-purple-500"} ${isHighlighted ? "ring- ring-yellow-400/50" : ""}`}
          animate={{
            rotate: event.status === "live" ? 360 : 0,
            borderWidth: isHovered ? 6 : isHighlighted ? 5 : 4,
            scale: isHighlighted ? 1.05 : 1,
          }}
          transition={{
            rotate: {
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            borderWidth: {
              duration: 0.3,
            },
            scale: {
              duration: 0.3,
            },
          }}
        />
        <div className="absolute bg-gradient-to-br from-gray-900/80 to-gray-800/80 inset-2 backdrop-blur-xl rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1">
                <span className="text-white font-bold text-xs">
                  {event?.attendees}
                </span>
              </div>
              <p className="text-white text-xs font-medium text-center leading-tight">
                {event?.title.slice(0, 10)}...
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Eye className="w-3 h-3 text-gray-300" />
                <span className="text-gray-300 text-xs">{event?.viewers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventPortal;
