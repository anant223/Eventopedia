import {motion} from "framer-motion";
import { Link } from "react-router-dom";

const  InvalidTokenState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="text-[18px] font-semibold text-[#1a1814] tracking-[-0.02em]">
        Link expired
      </h2>
      <p className="text-[13.5px] text-[#6b6966] mt-1.5 leading-relaxed max-w-[270px]">
        This password reset link has expired or already been used. Request a new
        one.
      </p>
      <Link
        to="/forgot-password"
        className="
          mt-6 h-11 w-full flex items-center justify-center
          bg-[#1a1814] text-white rounded-xl
          text-[14px] font-bold tracking-[-0.1px]
          transition-all hover:bg-[#2c2926] active:scale-[0.99]
        "
      >
        Request new link
      </Link>
      <Link
        to="/auth?type=login"
        className="text-[13px] font-medium text-[#8a8480] hover:text-[#1a1814] mt-3 transition-colors"
      >
        Back to log in
      </Link>
    </motion.div>
  );
}
export default InvalidTokenState;