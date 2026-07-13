import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePayment from "@/hooks/usePayment";

const STATE = {
  LOADING: "loading",
  SUCCESS: "success",
  INCOMPLETE: "incomplete",
  ERROR: "error",
};

const IconRing = ({ bg, children }) => (
  <div
    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
    style={{ background: bg }}
  >
    {children}
  </div>
);

const PrimaryBtn = ({ children, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full py-3.5 rounded-xl text-[13px] font-medium bg-[#1a1814] text-[#f2eee7] border-none cursor-pointer mb-2.5"
  >
    {children}
  </motion.button>
);

const GhostBtn = ({ children, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full py-3.5 rounded-xl text-[13px] font-medium bg-transparent border border-black/15 text-[#1a1814] cursor-pointer"
  >
    {children}
  </motion.button>
);

const StatusRow = ({ items }) => (
  <div className="bg-[#f8f7f5] rounded-xl p-4 mb-5 flex flex-col gap-2">
    {items.map(({ label, value, valueColor }) => (
      <div key={label} className="flex items-center justify-between">
        <span className="text-xs text-[#9b9890]">{label}</span>
        <span
          className="text-xs font-medium"
          style={{ color: valueColor ?? "#1a1814" }}
        >
          {value}
        </span>
      </div>
    ))}
  </div>
);

const Card = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="bg-white border border-black/[0.09] rounded-[20px] p-10 w-full max-w-sm text-center"
  >
    {children}
  </motion.div>
);

// ── screens ───────────────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <Card>
    <div className="w-10 h-10 rounded-full border-2 border-[#f0ede6] border-t-[#1a1814] mx-auto mb-5 animate-spin" />
    <p className="text-[18px] font-medium text-[#1a1814] mb-2">
      Checking your account
    </p>
    <p className="text-[13px] text-[#6b6966] leading-relaxed">
      We're verifying your Stripe setup.
      <br />
      This only takes a moment.
    </p>
  </Card>
);








const OnboardingReturn = ({  onContinueSetup }) => {
  const navigate = useNavigate();
  const {checkAccountStatus} = usePayment()
  const [state, setState] = useState(STATE.LOADING);

  const verify = async () => {
    try {
      const { stripeOnboardingCompleted } = await checkAccountStatus();
      setState(stripeOnboardingCompleted ? STATE.SUCCESS : STATE.INCOMPLETE);
    } catch {
      setState(STATE.ERROR);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0ede6] flex items-center justify-center p-6 font-roboto">
      {state === STATE.LOADING && <LoadingScreen />}
      {state === STATE.SUCCESS && (
        <SuccessScreen
          onGoToSettings={() => navigate("/settings")}
          onCreateEvent={() => navigate("/events/new")}
        />
      )}
      {state === STATE.INCOMPLETE && (
        <IncompleteScreen
          onContinue={async () => {
            try {
              await onContinueSetup?.();
            } catch {
              setState(STATE.ERROR);
            }
          }}
          onLater={() => navigate("/settings")}
        />
      )}
      {state === STATE.ERROR && (
        <ErrorScreen
          onRetry={() => {
            setState(STATE.LOADING);
          }}
          onBack={() => navigate("/settings")}
        />
      )}
    </div>
  );
};

export default OnboardingReturn;
