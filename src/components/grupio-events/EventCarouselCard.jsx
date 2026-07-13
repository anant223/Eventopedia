import React from 'react'
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {getCategoryColor, getCategoryEmoji}  from "@/utils/constant"

const EventCarouselCard = ({ event }) => {
  const navigate = useNavigate();
  const color = getCategoryColor(event.category);
  const emoji = getCategoryEmoji(event.category);

  const timeLabel = event.startDateTime
    ? new Date(event.startDateTime).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date TBD";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/main/events/${event._id}`)}
      className="flex-shrink-0 w-40 bg-[rgba(245,242,236,0.97)] rounded-2xl overflow-hidden border border-white/80 shadow-md cursor-pointer"
    >
      <div
        className="h-[72px] flex items-center justify-center text-3xl overflow-hidden"
        style={{ background: event.coverImage ? "transparent" : `${color}18` }}
      >
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          emoji
        )}
      </div>
      <div className="p-2.5">
        <p className="text-xs font-semibold text-[#1a1814] mb-1 truncate">
          {event.title}
        </p>
        <p className="text-[10px] text-gray-400 mb-1.5">{timeLabel}</p>
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: `${color}15`, color }}
          >
            {event.category}
          </span>
          <span
            className="text-[10px] font-semibold"
            style={{ color: event.isPaid === false ? "#10B981" : "#E24B4A" }}
          >
            {event.isPaid === false ? "Free" : `₹${event.price || ""}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
 export default EventCarouselCard;
