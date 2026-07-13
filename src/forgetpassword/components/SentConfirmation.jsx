import { Link } from "react-router-dom";
import {motion} from "framer-motion"
const  SentConfirmation = ({ email, onResend, resending }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 rounded-full bg-[#D85A30]/10 flex items-center justify-center mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D85A30"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 6 12 13 2 6" />
          <rect x="2" y="4" width="20" height="16" rx="2" />
        </svg>
      </div>

      <h2 className="text-[18px] font-semibold text-[#1a1814] tracking-[-0.02em]">
        Check your email
      </h2>
      <p className="text-[13.5px] text-[#6b6966] mt-1.5 leading-relaxed max-w-[280px]">
        We've sent a password reset link to{" "}
        <span className="font-medium text-[#1a1814]">
          {typeof email === "object" ? email.email : email}
        </span>
      </p>

      <button
        type="button"
        onClick={onResend}
        disabled={resending}
        className="text-[13px] font-medium text-[#D85A30] hover:underline mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {resending ? "Resending…" : "Didn't get it? Resend email"}
      </button>

      <Link
        to="/auth?type=login"
        className="text-[13px] font-medium text-[#8a8480] hover:text-[#1a1814] mt-3 transition-colors"
      >
        Back to log in
      </Link>
    </motion.div>
  );
}

export default SentConfirmation;