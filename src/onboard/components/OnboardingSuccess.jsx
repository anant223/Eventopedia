import { motion } from "framer-motion";

const OnboardingSuccess = ({ onContinue }) => {
  return (
    <div className="w-full max-w-[480px] bg-white rounded-[24px] border border-black/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center text-center">
    <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="w-16 h-16 rounded-full bg-[#D85A30]/10 flex items-center justify-center mb-6"
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

    <h2 className="text-[24px] font-extrabold text-[#1a1814] tracking-[-0.04em] mb-2">
        You're all set!
    </h2>
    <p className="text-[13.5px] text-[#6b6966] leading-relaxed max-w-[280px] mb-8">
        We've tailored your map and feed to your preferences. Time to find
        some events.
    </p>

    <button
        type="button"
        onClick={onContinue}
        className="w-full h-12 bg-[#1a1814] text-white rounded-xl text-[14px] font-bold tracking-[-0.1px] hover:bg-[#272420] active:scale-[0.99] transition-all"
    >
        Go to my map →
    </button>
    </div>
  );
}
export default OnboardingSuccess;
