import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {EventCarouselCard, MoreCards} from "./index";
import { useRef } from "react";

const EventCarousel = ({ events, isOpen, onClose, onSeeAll }) => {
  const scrollRef = useRef(null);
  const PREVIEW_COUNT = 8;
  const previewEvents = events.slice(0, PREVIEW_COUNT);
  const hasMore = events.length > PREVIEW_COUNT;

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="absolute bottom-6 left-4 right-4 z-20"
        >
          <div className="bg-[rgba(245,242,236,0.92)] rounded-2xl border border-white/80 shadow-2xl backdrop-blur-xl p-3">
            {/* header */}
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <p className="text-[13px] font-semibold text-[#1a1814] mb-0.5">
                  Events nearby
                </p>
                <p className="text-[11px] text-gray-400">
                  {events.length} found in your area
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-black/7 border-none flex items-center justify-center cursor-pointer"
              >
                <X size={13} className="text-gray-500" />
              </motion.button>
            </div>

            {/* cards */}
            <div
              ref={scrollRef}
              onWheel={handleWheel}
              className="flex gap-2 overflow-x-auto pb-0.5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {previewEvents.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <EventCarouselCard event={event} />
                </motion.div>
              ))}

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: PREVIEW_COUNT * 0.05 }}
                >
                  <MoreCards count={events.length} onClick={onSeeAll} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventCarousel;