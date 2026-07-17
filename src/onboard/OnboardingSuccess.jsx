import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function OnboardingSuccess() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count === 0) {
      navigate("/main/all-events", { replace: true });
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#f0ede6] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-[400px] mx-auto
          bg-transparent px-4
          sm:bg-white sm:px-7 sm:pt-8 sm:pb-7
          sm:rounded-3xl sm:border sm:border-black/[0.08]
          sm:shadow-[0_2px_24px_rgba(0,0,0,0.05)]
          flex flex-col items-center text-center
        "
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            delay: 0.1,
          }}
          className="w-16 h-16 rounded-full bg-[#D85A30]/10 flex items-center justify-center mb-5"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D85A30"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <h1 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#1a1814] mb-2">
          You're all set!
        </h1>
        <p className="text-sm text-[#6b6966] leading-relaxed max-w-[260px] mb-7">
          Your map and feed are personalised. Time to find some events.
        </p>

        {/* Countdown progress bar */}
        <div className="w-full h-1 bg-[#f0ede6] rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full bg-[#D85A30] rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/main/all-events", { replace: true })}
          className="
            w-full h-11 bg-[#D85A30] text-white rounded-xl
            text-[14px] font-bold tracking-[-0.1px]
            transition-all hover:bg-[#c04e28] active:scale-[0.99]
            mb-3
          "
        >
          Go to my map
        </button>

        <p className="text-[12px] text-[#9a9590]">Redirecting in {count}s…</p>
      </motion.div>
    </div>
  );
}
