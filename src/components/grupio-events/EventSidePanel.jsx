import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { EventListCard } from "./index";

const EventSidePanel = ({ events, user, isOpen, onClose }) => {
  const [mode, setMode] = useState("picks");
  const [activeCategory, setActiveCategory] = useState(null);

  const userCategories = useMemo(() => {
    const prefs = [
      ...(user?.preferredCategories || []),
      ...(user?.interests || []),
    ];
    return [...new Set(prefs.map((c) => c.toLowerCase()))];
  }, [user]);

  const allCategories = useMemo(() => {
    return [
      ...new Set(events.map((e) => e.category?.toLowerCase()).filter(Boolean)),
    ];
  }, [events]);

  const displayCategories = mode === "picks" ? userCategories : allCategories;

  const filteredEvents = useMemo(() => {
    let result = events;
    if (mode === "picks" && userCategories.length > 0) {
      result = events.filter((e) =>
        userCategories.includes(e.category?.toLowerCase())
      );
    }
    if (activeCategory) {
      result = result.filter(
        (e) => e.category?.toLowerCase() === activeCategory
      );
    }
    return result;
  }, [events, mode, activeCategory, userCategories]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[25]"
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-[rgba(245,242,236,0.97)] border-l border-white/75 shadow-2xl backdrop-blur-xl z-30 flex flex-col"
          >
            {/* header */}
            <div className="px-4 pt-4 pb-3 border-b border-black/6 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[15px] font-semibold text-[#1a1814] mb-0.5">
                    All Events
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {filteredEvents.length} of {events.length} showing
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-black/6 border-none flex items-center justify-center cursor-pointer"
                >
                  <X size={13} className="text-gray-500" />
                </motion.button>
              </div>

              {/* My Picks / All toggle */}
              <div className="inline-flex bg-black/5 rounded-full p-0.5 mb-2.5">
                {["picks", "all"].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setActiveCategory(null);
                    }}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-semibold border-none cursor-pointer transition-all ${
                      mode === m
                        ? "bg-[#1a1814] text-white"
                        : "bg-transparent text-gray-400"
                    }`}
                  >
                    {m === "picks" ? "My Picks" : "All"}
                  </button>
                ))}
              </div>

              {/* category pills */}
              {displayCategories.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {displayCategories.map((cat) => {
                    const isActive = activeCategory === cat;
                    const color = getCategoryColor(cat);
                    return (
                      <motion.button
                        key={cat}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(isActive ? null : cat)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full border-none cursor-pointer text-[11px] font-medium transition-all capitalize"
                        style={{
                          background: isActive ? color : "rgba(0,0,0,0.06)",
                          color: isActive ? "white" : "#555",
                        }}
                      >
                        <span className="text-xs">{getCategoryEmoji(cat)}</span>
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {mode === "picks" && userCategories.length === 0 && (
                <p className="text-[11px] text-gray-400">
                  Complete onboarding to see your picks
                </p>
              )}
            </div>

            {/* list */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1.5">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-3xl mb-2">🗺️</p>
                  <p className="text-[13px] text-gray-400">
                    No events match this filter
                  </p>
                </div>
              ) : (
                filteredEvents.map((event, i) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    <EventListCard event={event} />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventSidePanel;
