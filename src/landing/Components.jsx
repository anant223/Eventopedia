import { motion } from "framer-motion";

// ─── animation variants ───────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

// ─── FadeUp — wraps any content with scroll-triggered fade up ─────────────────

export const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── SectionLabel — small uppercase label above section titles ────────────────

export const SectionLabel = ({ children }) => (
  <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#9b9890] mb-3">
    {children}
  </p>
);

// ─── Badge — pill badge for status/announcements ──────────────────────────────

export const Badge = ({ children, pulse = false }) => (
  <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-1.5 text-xs font-medium text-[#9b9890]">
    {pulse && (
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D9E75] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1D9E75]" />
      </span>
    )}
    {children}
  </div>
);

// ─── FeatureCard — individual feature tile ────────────────────────────────────

export const FeatureCard = ({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}) => (
  <motion.div
    variants={fadeUp}
    className="bg-white border border-black/[0.09] rounded-2xl p-5 hover:shadow-sm hover:border-black/[0.15] transition-all duration-200"
  >
    {/* Icon */}
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
      style={{ background: iconBg }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
    </div>

    {/* Text */}
    <h3 className="text-[14px] font-semibold text-[#1a1814] mb-2 tracking-[-0.01em]">
      {title}
    </h3>
    <p className="text-[13px] text-[#9b9890] leading-[1.65]">{description}</p>
  </motion.div>
);
// ─── PrimaryBtn — main CTA button ─────────────────────────────────────────────

export const PrimaryBtn = ({ children, onClick, type = "button" }) => (
  <motion.button
    type={type}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="px-6 py-3 bg-[#1a1814] text-[#f2eee7] text-[13px] font-medium rounded-xl border-none cursor-pointer"
  >
    {children}
  </motion.button>
);

// ─── GhostBtn ─────────────────────────────────────────────────────────────────

export const GhostBtn = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="px-6 py-3 bg-transparent text-[#1a1814] text-[13px] font-medium rounded-xl border border-black/15 cursor-pointer"
  >
    {children}
  </motion.button>
);

// ─── Divider ──────────────────────────────────────────────────────────────────

export const Divider = () => (
  <div className="h-px bg-black/[0.07] max-w-[640px] mx-auto" />
);

// ─── EmailInput — waitlist email capture ──────────────────────────────────────

export const EmailInput = ({ onSubmit, loading, submitted }) => {
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 text-[13px] font-medium text-[#1D9E75]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8l3.5 3.5L13 4" />
        </svg>
        You're on the list — we'll be in touch!
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex bg-white border border-black/12 rounded-xl overflow-hidden w-full max-w-[380px]"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="flex-1 border-none outline-none px-4 py-3 text-[13px] text-[#1a1814] placeholder-[#9b9890] bg-transparent font-[inherit]"
        
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-3 bg-[#1a1814] text-[#f2eee7] text-[13px] font-medium border-none cursor-pointer rounded-r-xl shrink-0 disabled:opacity-60"
      >
        {loading ? "..." : "Notify me"}
      </button>
    </form>
  );
};
