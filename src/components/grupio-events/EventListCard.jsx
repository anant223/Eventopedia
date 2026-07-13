import { useNavigate } from "react-router-dom";
import {getCategoryColor, getCategoryEmoji} from "@/utils/constant"
import {motion} from "framer-motion";
import { Clock } from "lucide-react";

const EventListCard = ({ event }) => {
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
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/main/events/${event._id}`)}
      className="flex gap-2.5 items-center bg-white rounded-xl overflow-hidden border border-black/5 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* thumbnail */}
      <div
        className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl overflow-hidden"
        style={{ background: `${color}18` }}
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

      {/* content */}
      <div className="flex-1 min-w-0 py-2 pr-2.5">
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <p className="text-xs font-semibold text-[#1a1814] truncate">
            {event.title}
          </p>
          <span
            className="text-[10px] font-semibold flex-shrink-0"
            style={{ color: event.isPaid === false ? "#10B981" : "#E24B4A" }}
          >
            {event.isPaid === false ? "Free" : `₹${event.price || ""}`}
          </span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <Clock size={9} className="text-gray-300" />
          <p className="text-[10px] text-gray-400">{timeLabel}</p>
        </div>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: `${color}15`, color }}
        >
          {event.category}
        </span>
      </div>
    </motion.div>
  );
};
export default EventListCard