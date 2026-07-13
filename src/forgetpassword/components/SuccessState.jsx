import {motion} from "framer-motion"
import { Link } from "react-router-dom";

const SuccessState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 rounded-full bg-[#3B6D11]/10 flex items-center justify-center mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3B6D11"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-[18px] font-semibold text-[#1a1814] tracking-[-0.02em]">
        Password updated
      </h2>
      <p className="text-[13.5px] text-[#6b6966] mt-1.5 leading-relaxed max-w-[260px]">
        Your password has been reset successfully. You can now log in with your
        new password.
      </p>
      <Link
        to="/auth?type=login"
        className="
          mt-6 h-11 w-full flex items-center justify-center
          bg-[#1a1814] text-white rounded-xl
          text-[14px] font-bold tracking-[-0.1px]
          transition-all hover:bg-[#2c2926] active:scale-[0.99]
        "
      >
        Log in to Grupio
      </Link>
    </motion.div>
  );
}
export default SuccessState;