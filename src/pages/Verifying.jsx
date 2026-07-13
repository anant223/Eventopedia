import useAuth from "@/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const STATE = {
  PENDING: "pending",
  LOADING: "loading",
  SUCCESS: "success",
  EXPIRED: "expired",
};

const IconCircle = ({ className, children }) => (
  <div
    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${className}`}
  >
    {children}
  </div>
);

const PrimaryBtn = ({ onClick, disabled, children, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3.5 rounded-xl text-[13px] font-medium bg-[#1a1814] text-[#f2eee7] border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-opacity ${className}`}
  >
    {children}
  </button>
);

const GhostBtn = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full py-3.5 rounded-xl text-[13px] font-medium bg-transparent border border-black/15 text-[#1a1814] cursor-pointer"
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="w-full max-w-sm bg-white rounded-2xl border border-black/[0.09] px-8 py-10 text-center">
    {children}
  </div>
);

/**
 * VerifyEmailPage
 *
 * Props:
 *   onVerify  — (token: string) => Promise<void>
 *   newEmail  — string  (the email user is changing to)
 */
const Verifying = ({ onVerify, newEmail = "" }) => {
  const navigate = useNavigate();
  const {confirmEmailUpdate} = useAuth()
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [pageState, setPageState] = useState(
    token ? STATE.LOADING : STATE.PENDING
  );
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;
    hasVerified.current = true;
    const verify = async () => {
      try {
        await confirmEmailUpdate(token);
        setPageState(STATE.SUCCESS);
      } catch {
        setPageState(STATE.EXPIRED);
      }
    };
    verify();
  }, [token]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleResend = async () => {
    setResendLoading(true);
    try {
      // await api.post("/auth/resend-verification");
      setResendSent(true);
      setCountdown(60);
    } finally {
      setResendLoading(false);
    }
  };

  const Shell = ({ children }) => (
    <div className="min-h-screen bg-[#f0ede6] flex items-center justify-center p-6 font-roboto">
      {children}
    </div>
  );

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (pageState === STATE.LOADING) {
    return (
      <Shell>
        <Card>
          <div className="w-16 h-16 rounded-full border-2 border-[#f0ede6] border-t-[#1a1814] mx-auto mb-5 animate-spin" />
          <p className="text-[17px] font-medium text-[#1a1814] mb-2">
            Verifying your email
          </p>
          <p className="text-[13px] text-[#9b9890] leading-relaxed">
            Just a moment…
          </p>
        </Card>
      </Shell>
    );
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────
  if (pageState === STATE.SUCCESS) {
    return (
      <Shell>
        <Card>
          <IconCircle className="bg-[#EAF3DE]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#3B6D11"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l3.5 3.5L13 4" />
            </svg>
          </IconCircle>

          <p className="text-[17px] font-medium text-[#1a1814] mb-2">
            Email verified
          </p>
          <p className="text-[13px] text-[#6b6966] leading-relaxed mb-7">
            Your email address has been updated successfully.
            {newEmail && (
              <>
                <br />
                <span className="font-medium text-[#1a1814]">{newEmail}</span>
              </>
            )}
          </p>

          <PrimaryBtn onClick={() => navigate("/settings")}>
            Back to settings
          </PrimaryBtn>
        </Card>
      </Shell>
    );
  }

  // ── EXPIRED ───────────────────────────────────────────────────────────────
  if (pageState === STATE.EXPIRED) {
    return (
      <Shell>
        <Card>
          <IconCircle className="bg-[#FCEBEB]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#A32D2D"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M8 5v3M8 11v.5" />
            </svg>
          </IconCircle>

          <p className="text-[17px] font-medium text-[#1a1814] mb-2">
            Link expired
          </p>
          <p className="text-[13px] text-[#6b6966] leading-relaxed mb-7">
            This verification link has expired or already been used. Request a
            new one below.
          </p>

          <div className="flex flex-col gap-2.5">
            <PrimaryBtn
              onClick={handleResend}
              disabled={resendLoading || countdown > 0}
            >
              {resendLoading
                ? "Sending…"
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend verification link"}
            </PrimaryBtn>
            <GhostBtn onClick={() => navigate("/settings")}>
              Back to settings
            </GhostBtn>
          </div>
        </Card>
      </Shell>
    );
  }

  // ── PENDING ───────────────────────────────────────────────────────────────
  return (
    <Shell>
      <Card>
        <IconCircle className="bg-[#E6F1FB]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#185FA5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="12" height="10" rx="2" />
            <path d="M2 6l6 4 6-4" />
          </svg>
        </IconCircle>

        <p className="text-[17px] font-medium text-[#1a1814] mb-2">
          Check your inbox
        </p>
        <p className="text-[13px] text-[#6b6966] leading-relaxed mb-2">
          We sent a verification link to
        </p>

        {newEmail && (
          <p className="text-[14px] font-medium text-[#1a1814] bg-[#f0ede6] rounded-lg px-4 py-2 inline-block mb-6">
            {newEmail}
          </p>
        )}

        <p className="text-[12px] text-[#9b9890] leading-relaxed mb-7">
          Click the link in the email to confirm your new address. The link
          expires in{" "}
          <span className="font-medium text-[#1a1814]">5 minutes</span>.
        </p>

        <div className="border-t border-black/[0.07] pt-5 flex flex-col gap-2.5">
          <p className="text-[12px] text-[#9b9890] mb-1">Didn't receive it?</p>

          <button
            onClick={handleResend}
            disabled={resendLoading || countdown > 0}
            className={`w-full py-3.5 rounded-xl text-[13px] font-medium border border-black/10 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed
              ${
                resendSent
                  ? "bg-[#EAF3DE] text-[#3B6D11]"
                  : "bg-[#f0ede6] text-[#1a1814]"
              }`}
          >
            {resendLoading
              ? "Sending…"
              : countdown > 0
                ? `Resend in ${countdown}s`
                : resendSent
                  ? "Sent! Check your inbox"
                  : "Resend verification link"}
          </button>

          <GhostBtn onClick={() => navigate("/settings")}>
            Back to settings
          </GhostBtn>
        </div>
      </Card>
    </Shell>
  );
};

export default Verifying;
