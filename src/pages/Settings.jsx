import useAuth from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {localNotificationPreferances} from "@/app/slices/authSlice"
import useCategory from "@/hooks/useCategory";
import { clearRegisteredEvents } from "@/app/slices/registerSlice";
import usePayment from "@/hooks/usePayment";
import { useForm } from "react-hook-form";
import { tree } from "d3";
import { Camera, Eye, EyeOffIcon, Mail } from "lucide-react";
import SettingsPage from "@/settings/SettingPage";
import SettingPage from "@/settings/SettingPage";
import { PageShell } from "@/components/layout/PageShell";


// ─── shared primitives for all settings screens ──────────────────────────────

const colors = {
  bg:      "#f0ede6",
  dark:    "#1a1814",
  cream:   "#f2eee7",
  muted:   "#9b9890",
  faint:   "#c0bdb8",
  surface: "#f8f7f5",
  border:  "rgba(0,0,0,0.09)",
  divider: "rgba(0,0,0,0.07)",
};

// back button
const BackBtn = ({ label = "Settings", onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 13, color: colors.muted, background: "none",
      border: "none", cursor: "pointer", padding: 0, marginBottom: 20,
    }}
  >
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L5 8l5 5" />
    </svg>
    {label}
  </button>
);

// page title
const PageTitle = ({ children }) => (
  <p style={{ fontSize: 20, fontWeight: 500, color: colors.dark, marginBottom: 24 }}>
    {children}
  </p>
);



// field wrapper
const Field = ({ label, required, hint, children, style }) => (
  <div style={{ marginBottom: 16, ...style }}>
    {label && (
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: colors.muted, marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#D85A30" }}>*</span>}
      </label>
    )}
    {children}
    {hint && <p style={{ fontSize: 11, color: colors.muted, marginTop: 5 }}>{hint}</p>}
  </div>
);

// text input
const Input = ({ style, ...props }) => (
  <input
    {...props}
    style={{
      width: "100%", background: colors.surface,
      border: `0.5px solid rgba(0,0,0,0.12)`, borderRadius: 10,
      padding: "10px 12px", fontSize: 13, color: colors.dark,
      fontFamily: "inherit", outline: "none", ...style,
    }}
    onFocus={e => { e.target.style.borderColor = "rgba(26,24,20,.4)"; e.target.style.background = "#fff"; }}
    onBlur={e  => { e.target.style.borderColor = "rgba(0,0,0,.12)";   e.target.style.background = colors.surface; }}
  />
);

// textarea
export const Textarea = ({ style, ...props }) => (
  <textarea
    {...props}
    style={{
      width: "100%", background: colors.surface,
      border: `0.5px solid rgba(0,0,0,0.12)`, borderRadius: 10,
      padding: "10px 12px", fontSize: 13, color: colors.dark,
      fontFamily: "inherit", outline: "none", resize: "vertical",
      minHeight: 88, lineHeight: 1.55, ...style,
    }}
    onFocus={e => { e.target.style.borderColor = "rgba(26,24,20,.4)"; e.target.style.background = "#fff"; }}
    onBlur={e  => { e.target.style.borderColor = "rgba(0,0,0,.12)";   e.target.style.background = colors.surface; }}
  />
);

// primary save button
export const SaveBtn = ({ children, onClick, loading, success, danger }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%", padding: 13, borderRadius: 10, fontSize: 13,
      fontWeight: 500, border: "none", cursor: "pointer",
      background: success ? "#1D9E75" : danger ? "#D85A30" : colors.dark,
      color: "#fff", transition: "background 0.2s", marginTop: 4,
    }}
  >
    {loading ? "Saving…" : success ? "Saved!" : children}
  </button>
);

// ghost cancel button
export const CancelBtn = ({ children = "Cancel", onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%", padding: 13, borderRadius: 10, fontSize: 13,
      fontWeight: 500, background: "transparent",
      border: `0.5px solid rgba(0,0,0,0.15)`, color: colors.dark,
      cursor: "pointer", marginTop: 10,
    }}
  >
    {children}
  </button>
);






// page shell
const Shell = ({ children }) => (
  <div style={{ minHeight: "100vh", background: colors.bg, fontFamily: "inherit" }}>
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 16px 80px" }}>
      {children}
    </div>
  </div>
);

// ─── primitives ───────────────────────────────────────────────────────────────

const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    style={{
      width: 40,
      height: 24,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      padding: 0,
      flexShrink: 0,
      position: "relative",
      background: value ? "#1a1814" : "#d1cfc9",
      transition: "background 0.2s",
    }}
  >
    <span
      style={{
        position: "absolute",
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#fff",
        top: 3,
        left: 3,
        transform: value ? "translateX(16px)" : "translateX(0)",
        transition: "transform 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
      }}
    />
  </button>
);

const Divider = () => (
  <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.07)", marginLeft: 52 }} />
);

const SectionLabel = ({ children }) => (
  <p 
    className="text-xs font-medium"
    style={{
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#9b9890",
      marginBottom: 8,
    }}
  >
    {children}
  </p>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 14,
      border: "0.5px solid rgba(0,0,0,0.09)",
      overflow: "hidden",
      marginBottom: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

const Row = ({
  icon,
  iconBg = "#f0ede6",
  iconColor = "#9b9890",
  title,
  subtitle,
  right,
  danger,
  onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 16px",
      cursor: onClick ? "pointer" : "default",
      transition: "background 0.15s",
    }}
    onMouseEnter={(e) => {
      if (onClick) e.currentTarget.style.background = "#faf9f7";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
    }}
  >
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: danger ? "#FAECE7" : iconBg,
        color: danger ? "#D85A30" : iconColor,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p
        style={{
          fontSize: 14,
          fontWeight: 500,
          margin: 0,
          color: danger ? "#D85A30" : "#1a1814",
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p style={{ fontSize: 12, margin: "2px 0 0", color: "#9b9890" }}>
          {subtitle}
        </p>
      )}
    </div>
    {right}
  </div>
);

const Chevron = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="#c0bdb8"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3l5 5-5 5" />
  </svg>
);

// ─── icons ────────────────────────────────────────────────────────────────────

const icons = {
  bell: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 2.5.8 3.5 1.3 4H2.2c.5-.5 1.3-1.5 1.3-4A4.5 4.5 0 0 1 8 1.5z" />
      <path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" />
    </svg>
  ),
  email: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="12" height="10" rx="2" />
      <path d="M2 6l6 4 6-4" />
    </svg>
  ),
  cohost: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" />
      <path d="M1.5 14c0-2.5 2-4.5 4.5-4.5" />
      <circle cx="12" cy="6" r="2.5" />
      <path d="M9.5 10a4.5 4.5 0 0 1 5 4" />
    </svg>
  ),
  reminder: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 2" />
    </svg>
  ),
  cancelled: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
    </svg>
  ),
  pin: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2C5.2 2 3 4.2 3 7c0 3.5 5 8 5 8s5-4.5 5-8c0-2.8-2.2-5-5-5z" />
      <circle cx="8" cy="7" r="1.5" />
    </svg>
  ),
  lock: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="10" height="8" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  ),
  link: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 9a3 3 0 0 0 4.5.3l1.5-1.5a3 3 0 0 0-4.2-4.2L7.5 4.8" />
      <path d="M9 7a3 3 0 0 0-4.5-.3L3 8.2a3 3 0 0 0 4.2 4.2l1.3-1.2" />
    </svg>
  ),
  stripe: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1.5" y="4" width="13" height="9" rx="1.5" />
      <path d="M1.5 7h13" />
    </svg>
  ),
  logout: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#D85A30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 3H13.5v10H11M6.5 10.5L11 8 6.5 5.5M11 8H2" />
    </svg>
  ),
  trash: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#D85A30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 4 14 12 14 13 6" />
      <path d="M1 6h14M6 6V3h4v3" />
    </svg>
  ),
};

// ─── category chip ────────────────────────────────────────────────────────────

const Chip = ({ label, emoji, color, active, onClick }) => {
  return <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all duration-150 flex-shrink-0 capitalize`}
    style={{
      border: active ? `1.5px solid ${color}` : "0.5px solid rgba(0,0,0,0.15)",
      background: active ? `${color}18` : "transparent",
      color: active ? color : "#9b9890",
    }}
  >
    <span className="text-[14px] leading-none">{emoji}</span>
    {label}
  </button>
};


const Feature = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px" }}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
      stroke="#1D9E75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M3 8l3.5 3.5L13 4"/>
    </svg>
    <span style={{ fontSize: 13, color: "#1a1814" }}>{children}</span>
  </div>
);

/**
 * StripeSheet
 *
 * Props:
 *   open        — boolean
 *   onClose     — () => void
 *   onContinue  — () => Promise<void>   triggers Stripe onboarding redirect
 *   loading     — boolean
 */

/**
 * BottomSheet
 *
 * Props:
 *   open      — boolean
 *   onClose   — () => void
 *   children  — sheet content
 */
const Sheet = ({ open, onClose, children, maxWidth = 420 }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );

  // track viewport changes
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // mount / unmount with animation timing
  useEffect(() => {
    if (open) {
      setMounted(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  // lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  // ── shared overlay ───────────────────────────────────────────────────────
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    background: visible ? "rgba(26,24,20,0.45)" : "rgba(26,24,20,0)",
    transition: "background 0.3s",
    display: "flex",
    alignItems: isMobile ? "flex-end" : "center",
    justifyContent: isMobile ? "stretch" : "center",
  };

  // ── mobile — bottom sheet ────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        style={overlayStyle}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          style={{
            width: "100%",
            background: "#fff",
            borderRadius: "16px 16px 0 0",
            transform: visible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s cubic-bezier(.32,.72,0,1)",
            paddingBottom: "env(safe-area-inset-bottom, 24px)",
          }}
        >
          {/* drag handle */}
          <div
            style={{
              width: 36,
              height: 4,
              background: "rgba(0,0,0,0.12)",
              borderRadius: 2,
              margin: "12px auto 0",
            }}
          />
          {children}
        </div>
      </div>
    );
  }

  // ── desktop / tablet — centered modal ────────────────────────────────────
  return (
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth,
          background: "#fff",
          borderRadius: 16,
          border: "0.5px solid rgba(0,0,0,0.09)",
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(8px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.25s cubic-bezier(.32,.72,0,1), opacity 0.25s",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#f0ede6",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#9b9890"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    </div>
  );
};

const StripeSheet = ({ open, onClose, onContinue, loading = false }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    setSubmitting(true);
    try {
      await onContinue?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div style={{ padding: "20px 20px 0" }}>

        {/* icon */}
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "#E6F1FB", display: "flex",
          alignItems: "center", justifyContent: "center",
          margin: "8px auto 14px",
        }}>
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none"
            stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1.5" y="4" width="13" height="9" rx="1.5"/>
            <path d="M1.5 7h13"/>
          </svg>
        </div>

        <p style={{ fontSize: 17, fontWeight: 500, color: "#1a1814", textAlign: "center", marginBottom: 6 }}>
          Connect Stripe
        </p>
        <p style={{ fontSize: 13, color: "#6b6966", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>
          Set up payouts to charge for tickets and receive money directly to your bank account.
        </p>

        {/* feature list */}
        <div style={{
          background: "#f8f7f5", borderRadius: 10,
          overflow: "hidden", marginBottom: 16,
        }}>
          {[
            "Sell tickets for your events",
            "Receive payouts to your bank",
            "Secure payments via Stripe",
            "Funds in 2–7 business days",
          ].map((f, i, arr) => (
            <div key={f} style={{ borderBottom: i < arr.length - 1 ? "0.5px solid rgba(0,0,0,.06)" : "none" }}>
              <Feature>{f}</Feature>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "#9b9890", textAlign: "center", marginBottom: 16 }}>
          You'll be redirected to Stripe to complete setup. Takes about 5 minutes.
        </p>

        {/* cta */}
        <button
          onClick={handleContinue}
          disabled={submitting || loading}
          style={{
            width: "100%", padding: 13, borderRadius: 10, fontSize: 13,
            fontWeight: 500, background: "#1a1814", color: "#f2eee7",
            border: "none", cursor: "pointer", marginBottom: 10,
            opacity: submitting || loading ? 0.7 : 1,
          }}
        >
          {submitting || loading ? "Redirecting…" : "Continue with Stripe"}
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%", padding: 13, borderRadius: 10, fontSize: 13,
            fontWeight: 500, background: "transparent",
            border: "0.5px solid rgba(0,0,0,.15)", color: "#1a1814",
            cursor: "pointer", marginBottom: 8,
          }}
        >
          Maybe later
        </button>
      </div>
    </BottomSheet>
  );
};


const PaymentsScreen = ({ user = {}, onBack, onConnectStripe, onDisconnect }) => {
  const connected = user.stripeOnboardingCompleted ?? false;
  const [loading,      setLoading]      = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try { await onConnectStripe?.(); }
    finally { setLoading(false); }
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    try { await onDisconnect?.(); setConfirmDisconnect(false); }
    finally { setDisconnecting(false); }
  };

  return (
    <Shell>
      <BackBtn onClick={onBack} />
      <PageTitle>Payments</PageTitle>

      {/* status card */}
      <Card style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: connected ? "#EAF3DE" : "#FAEEDA",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none"
              stroke={connected ? "#3B6D11" : "#BA7517"}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1.5" y="4" width="13" height="9" rx="1.5"/>
              <path d="M1.5 7h13"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1814", margin: 0 }}>Stripe payouts</p>
            <p style={{ fontSize: 12, color: "#9b9890", marginTop: 2 }}>
              {connected ? "Your payout account is active" : "Not set up yet"}
            </p>
          </div>
          <span style={{
            marginLeft: "auto", fontSize: 11, fontWeight: 500,
            padding: "4px 10px", borderRadius: 6, flexShrink: 0,
            background: connected ? "#EAF3DE" : "#FAEEDA",
            color:      connected ? "#3B6D11"  : "#BA7517",
          }}>
            {connected ? "Active" : "Pending"}
          </span>
        </div>

        <p style={{ fontSize: 13, color: "#6b6966", lineHeight: 1.6 }}>
          {connected
            ? "You can receive ticket payments directly to your bank account via Stripe. Funds are typically available within 2–7 business days."
            : "Connect a Stripe account to charge for tickets and receive payouts. Grupio uses Stripe to handle all payments securely."
          }
        </p>
      </Card>

      {connected ? (
        <>
          {/* info rows */}
          <Card>
            <Row
              title="Payout schedule" subtitle="Every 2 days"
              icon={<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>}
              iconBg="#E1F5EE" iconColor="#0F6E56"
            />
            <div style={{ borderTop: "0.5px solid rgba(0,0,0,.07)", marginLeft: 54 }} />
            <Row
              title="Stripe dashboard" subtitle="View transactions & balance"
              icon={<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9"/><path d="M14 2l-6 6M10 2h4v4"/></svg>}
              iconBg="#E6F1FB" iconColor="#185FA5"
              right={<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#c0bdb8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>}
              onClick={() => window.open("https://dashboard.stripe.com", "_blank")}
            />
          </Card>

          {/* disconnect */}
          {!confirmDisconnect
            ? <button
                onClick={() => setConfirmDisconnect(true)}
                style={{
                  width: "100%", padding: 13, borderRadius: 10, fontSize: 13,
                  fontWeight: 500, background: "transparent",
                  border: "0.5px solid rgba(216,90,48,.3)", color: "#D85A30",
                  cursor: "pointer", marginTop: 4,
                }}
              >
                Disconnect Stripe
              </button>
            : <Card style={{ padding: 20 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1814", marginBottom: 8 }}>
                  Disconnect Stripe?
                </p>
                <p style={{ fontSize: 13, color: "#6b6966", lineHeight: 1.6, marginBottom: 16 }}>
                  You won't be able to sell tickets until you reconnect. Existing payouts won't be affected.
                </p>
                <button
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  style={{
                    width: "100%", padding: 12, borderRadius: 10, fontSize: 13,
                    fontWeight: 500, background: "#D85A30", color: "#fff",
                    border: "none", cursor: "pointer", marginBottom: 10,
                  }}
                >
                  {disconnecting ? "Disconnecting…" : "Yes, disconnect"}
                </button>
                <CancelBtn onClick={() => setConfirmDisconnect(false)} />
              </Card>
          }
        </>
      ) : (
        <SaveBtn onClick={handleConnect} loading={loading}>
          Connect with Stripe
        </SaveBtn>
      )}
    </Shell>
  );
};


const getStrength = (val) => {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  return score;
};

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", "#D85A30", "#BA7517", "#1D9E75", "#0F6E56"];

const FieldInput = ({
  label,
  value,
  onChange,
  placeholder,
  show,
  onToggle,
}) => (
  <div style={{ marginBottom: 14 }}>
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        color: "#9b9890",
        marginBottom: 6,
      }}
    >
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder ?? "••••••••"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "#f8f7f5",
          border: "0.5px solid rgba(0,0,0,.12)",
          borderRadius: 10,
          padding: "10px 40px 10px 12px",
          fontSize: 13,
          color: "#1a1814",
          fontFamily: "inherit",
          outline: "none",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(26,24,20,.4)";
          e.target.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(0,0,0,.12)";
          e.target.style.background = "#f8f7f5";
        }}
      />
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9b9890",
            padding: 0,
            display: "flex",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {show ? (
              <>
                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
                <circle cx="8" cy="8" r="2" />
              </>
            ) : (
              <>
                <path d="M2 2l12 12M6.7 6.8A2 2 0 0 0 8 10a2 2 0 0 0 1.3-.5M4 4.2C2.4 5.3 1 8 1 8s2.5 5 7 5c1.4 0 2.6-.4 3.6-1M9.9 4.4A7 7 0 0 1 15 8s-2.5 5-7 5" />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  </div>
);

const ChangePasswordSheet = ({ open, onClose, onSave }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(next);
  const mismatch = confirm.length > 0 && next !== confirm;

  const reset = () => {
    setCurrent("");
    setNext("");
    setConfirm("");
    setError("");
    setSaved(false);
    setShowCur(false);
    setShowNew(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async () => {
    setError("");
    if (!current) {
      setError("Enter your current password.");
      return;
    }
    if (strength < 2) {
      setError("Password is too weak.");
      return;
    }
    if (next !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      await onSave?.({ currentPassword: current, newPassword: next });
      setSaved(true);
      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (e) {
      setError(e?.message ?? "Incorrect current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div style={{ padding: "20px 20px 0" }}>
        {/* icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#f0ede6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "8px auto 14px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#1a1814"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="7" width="10" height="8" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
        </div>

        <p
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "#1a1814",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Change password
        </p>

        <FieldInput
          label="Current password"
          value={current}
          onChange={setCurrent}
          show={showCur}
          onToggle={() => setShowCur((s) => !s)}
        />

        {/* new password + strength */}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 500,
              color: "#9b9890",
              marginBottom: 6,
            }}
          >
            New password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              style={{
                width: "100%",
                background: "#f8f7f5",
                border: "0.5px solid rgba(0,0,0,.12)",
                borderRadius: 10,
                padding: "10px 40px 10px 12px",
                fontSize: 13,
                color: "#1a1814",
                fontFamily: "inherit",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(26,24,20,.4)";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,.12)";
                e.target.style.background = "#f8f7f5";
              }}
            />
            <button
              type="button"
              onClick={() => setShowNew((s) => !s)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9b9890",
                padding: 0,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showNew ? (
                  <>
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
                    <circle cx="8" cy="8" r="2" />
                  </>
                ) : (
                  <>
                    <path d="M2 2l12 12M6.7 6.8A2 2 0 0 0 8 10a2 2 0 0 0 1.3-.5M4 4.2C2.4 5.3 1 8 1 8s2.5 5 7 5c1.4 0 2.6-.4 3.6-1M9.9 4.4A7 7 0 0 1 15 8s-2.5 5-7 5" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* strength bar */}
          {next.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 2,
                      background:
                        i <= strength ? STRENGTH_COLOR[strength] : "#e0ddd8",
                      transition: "background .3s",
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: STRENGTH_COLOR[strength],
                  marginTop: 4,
                  fontWeight: 500,
                }}
              >
                {STRENGTH_LABEL[strength]}
              </p>
            </div>
          )}
          {!next.length && (
            <p style={{ fontSize: 11, color: "#9b9890", marginTop: 5 }}>
              Use 8+ characters with uppercase, numbers & symbols
            </p>
          )}
        </div>

        <div style={{ marginBottom: 4 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 500,
              color: "#9b9890",
              marginBottom: 6,
            }}
          >
            Confirm new password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{
              width: "100%",
              background: "#f8f7f5",
              border: `0.5px solid ${mismatch ? "rgba(216,90,48,.5)" : "rgba(0,0,0,.12)"}`,
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              color: "#1a1814",
              fontFamily: "inherit",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.background = "#f8f7f5";
            }}
          />
          {mismatch && (
            <p style={{ fontSize: 11, color: "#D85A30", marginTop: 5 }}>
              Passwords don't match
            </p>
          )}
        </div>

        {error && (
          <p style={{ fontSize: 12, color: "#D85A30", margin: "10px 0 0" }}>
            {error}
          </p>
        )}

        {/* cta */}
        <button
          onClick={handleSave}
          disabled={loading || saved}
          style={{
            width: "100%",
            padding: 13,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            background: saved ? "#1D9E75" : "#1a1814",
            color: "#fff",
            marginTop: 20,
            marginBottom: 10,
            transition: "background .3s",
          }}
        >
          {saved
            ? "Password updated!"
            : loading
              ? "Updating…"
              : "Update password"}
        </button>

        <button
          onClick={handleClose}
          style={{
            width: "100%",
            padding: 13,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            background: "transparent",
            border: "0.5px solid rgba(0,0,0,.15)",
            color: "#1a1814",
            cursor: "pointer",
            marginBottom: 8,
          }}
        >
          Cancel
        </button>
      </div>
    </BottomSheet>
  );
};

const DeleteAccountSheet = ({ open, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await onDelete?.();
      
      onClose();
    } catch (e) {
      setError(e?.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div style={{ padding: "20px 20px 0" }}>
        {/* icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#FAECE7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "8px auto 14px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#D85A30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 4 14 12 14 13 6" />
            <path d="M1 6h14M6 6V3h4v3" />
          </svg>
        </div>

        <p
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "#1a1814",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Delete account?
        </p>

        <p
          style={{
            fontSize: 13,
            color: "#6b6966",
            textAlign: "center",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          This will permanently remove your profile, events, and all your data.
          This action cannot be undone.
        </p>

        {/* what gets deleted */}
        <div
          style={{
            background: "#FCEBEB",
            borderRadius: 10,
            padding: "4px 14px",
            marginBottom: 20,
          }}
        >
          {[
            "Your profile & username",
            "All events you organised",
            "Your tickets & event history",
          ].map((item, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom:
                  i < arr.length - 1
                    ? "0.5px solid rgba(226,75,74,.15)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#D85A30",
                  flexShrink: 0,
                }}
              />
              <p style={{ fontSize: 13, color: "#791F1F", margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        {error && (
          <p
            style={{
              fontSize: 12,
              color: "#D85A30",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          style={{
            width: "100%",
            padding: 13,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            background: "#D85A30",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginBottom: 10,
          }}
        >
          {loading ? "Deleting…" : "Yes, delete my account"}
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: 13,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            background: "transparent",
            border: "0.5px solid rgba(0,0,0,.15)",
            color: "#1a1814",
            cursor: "pointer",
            marginBottom: 8,
          }}
        >
          Cancel
        </button>
      </div>
    </BottomSheet>
  );
};

const EditProfileSheet = ({ open, onClose}) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const imgRef = useRef(null);

  const {updateProfileError, updateUserProfile, user} = useAuth()

  const { handleSubmit, watch, register, formState:{errors}} = useForm({
    defaultValues: 
      {
        name: user?.name || "",
        bio: user?.bio || "",
      }
  });
  const bioValue = watch("bio", user?.bio || "");
  
  const handleImgRef = () => imgRef.current.click()
  
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if(!file) return;
    setAvatarFile(file)
    const render = new FileReader()
    render.onload = () => {
      setAvatarPreview(render.result)
    }
    render.readAsDataURL(file)
  }

  const handleClose = () => {
    setLoading(false);
    setSaved(false);
    setError(null);
    setAvatarFile(null);
    setAvatarPreview(null);
    onClose();
  };

  const handleProfileUpdate = async (data) => {
    setLoading(true)
    const fd = new FormData();
    fd.append("name", data.name.trim());
    fd.append("bio", data.bio.trim());
    if (avatarFile) fd.append("avatar", avatarFile);
    try {
      await updateUserProfile(fd);
      setSaved(true)
      setTimeout(() => handleClose(), 1200);
    } catch (error) {
      setError(updateProfileError);
      setLoading(false);
    }
  }
  
  const inputStyle = {
    width: "100%",
    background: "#f8f7f5",
    border: "0.5px solid rgba(0,0,0,.12)",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13,
    color: "#1a1814",
    fontFamily: "inherit",
    outline: "none",
    lineHeight: 1.55,
  };
  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(26,24,20,.4)";
    e.target.style.background = "#fff";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(0,0,0,.12)";
    e.target.style.background = "#f8f7f5";
  };

  return (
    <BottomSheet open={open} onClose={handleClose}>
      <div className="px-5 pt-5">
        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          <div
            className="flex items-center gap-4 mb-5 pb-5"
            style={{ borderBottom: "0.5px solid rgba(0,0,0,.07)" }}
          >
            <div
              onClick={handleImgRef}
              className="relative cursor-pointer flex-shrink-0"
            >
              {avatarPreview || user?.avatar ? (
                <img
                  src={avatarPreview || user?.avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f0ede6]"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#1a1814] text-[#f2eee7] text-[22px] font-medium flex items-center justify-center">
                  {user?.name?.[0]?.toUpperCase() ?? "G"}
                </div>
              )}

              {/* camera badge */}
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full  border-2 flex items-center justify-center bg-white shadow-sm">
                <Camera size={14} className="text-[#1a1814]" />
              </div>
            </div>

            <div>
              <p className="text-[13px] font-medium text-[#1a1814] m-0">
                Profile photo
              </p>
              <button
                type="button"
                onClick={handleImgRef}
                className="text-[12px] text-[#9b9890] bg-none border-none cursor-pointer p-0 mt-0.5"
              >
                Tap to change
              </button>
            </div>
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />
          </div>
          {/* name */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-[#9b9890] mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              defaultValue={user.name}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* bio */}
          <div className="mb-5">
            <label className=" block text-xs font-medium text-[#9b9890] mb-2">
              Bio
            </label>
            <textarea
              placeholder="Tell people a bit about yourself…"
              defaultValue={user.bio}
              {...register("bio")}
              maxLength={160}
              rows={3}
              className=" resize-none"
              style={{
                ...inputStyle,
                resize: "none",
              }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <p className="text-xs text-[#9b9890] text-right mt-1">
              {bioValue.length}/160
            </p>
          </div>
          {error && <p className="text-red text-xs mb-2">{error.message}</p>}
          <button
            type="submit"
            disabled={loading || saved}
            className={`w-full p-3.5 text-sm font-medium border-none rounded-[10px] text-white mb-2.5 transition-colors duration-300 ${
              saved
                ? "bg-[#1D9E75] cursor-default"
                : loading
                  ? "bg-[#1a1814]/70 cursor-not-allowed"
                  : "bg-[#1a1814] cursor-pointer"
            }`}
          >
            {saved ? "Saved!" : loading ? "Updating…" : "Update"}
          </button>
          <button
            onClick={handleClose}
            type="button"
            className="w-full p-3.5 font-medium text-sm bg-transparent rounded-[10px] cursor-pointer text-[#1a1814] mb-2"
            style={{ border: "0.5px solid rgba(0,0,0,.15)" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </BottomSheet>
  );
};

const EmailSheet = ({
  open,
  onClose,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const {user, updateNewEmail, changeEmailError} = useAuth()
  
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentEmail: user?.email || "",
      newEmail: "",
      password: "",
    },
  });

  const handleClose = () => {
    setSaved(false);
    setErr(null);
    reset();
    onClose();
  };

  const handleEmailUpdate = async (data) => {
    setLoading(true)
    setErr(null);
    try {
      const { newEmail, password } = data;
      await updateNewEmail({ newEmail, password });
      console.log(data);
      setSaved(true);
      setTimeout(() => handleClose(), 4000);
    } catch (e) {
      setErr(changeEmailError || "Something went wrong. Please try again.");
      setLoading(false)
    }
  };




  const inputStyle = {
    width: "100%",
    background: "#f8f7f5",
    border: "0.5px solid rgba(0,0,0,.12)",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13,
    color: "#1a1814",
    fontFamily: "inherit",
    outline: "none",
    lineHeight: 1.55,
  };

 

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(26,24,20,.4)";
    e.target.style.background = "#fff";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(0,0,0,.12)";
    e.target.style.background = "#f8f7f5";
  };

  

  return (
    <BottomSheet open={open} onClose={handleClose}>
      {!saved ? (
        <div className="px-5 pt-5 pb-2">
          <div className="w-[52px] h-[52px] rounded-full bg-[#E1F5EE] flex items-center justify-center mx-auto mt-2 mb-3.5">
            <Mail className="w-6 h-6 text-[#0F6E56]" />
          </div>

          <p className="text-[17px] font-medium text-[#1a1814] text-center mb-5">
            Change email
          </p>

          <form onSubmit={handleSubmit(handleEmailUpdate)}>
            {/* current email */}
            <div className="mb-3.5">
              <label className="block text-xs font-medium text-[#9b9890] mb-1.5">
                Current email
              </label>
              <input
                type="email"
                readOnly
                style={{
                  ...inputStyle,
                  color: "#9b9890",
                  cursor: "default",
                  background: "#f0ede6",
                }}
                {...register("currentEmail")}
              />
            </div>

            {/* new email */}
            <div className="mb-3.5">
              <label className="block text-xs font-medium text-[#9b9890] mb-1.5">
                New email
              </label>
              <input
                type="email"
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Enter new email address"
                style={inputStyle}
                {...register("newEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                  validate: (value) => {
                    if (value === user?.email) {
                      return "New email must be different from current email";
                    }
                    return true;
                  },
                })}
              />
              {errors.newEmail && (
                <p className="text-xs text-[#D85A30] mt-1">
                  {errors.newEmail.message}
                </p>
              )}
            </div>

            {/* password */}
            <div className="mb-1.5">
              <label className="block text-xs font-medium text-[#9b9890] mb-1.5">
                Confirm with password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Your current password"
                  style={{ ...inputStyle, paddingRight: 40 }}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9890]"
                >
                  {/* svg unchanged
                   */}
                  {showPass ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-[#D85A30] mt-1">
                  {errors.password.message}
                </p>
              )}
              <p className="text-[11px] text-[#9b9890] mt-1">
                We'll send a verification link to the new email address
              </p>
            </div>

            {/* api error */}
            {err && <p className="text-xs text-[#D85A30] mt-3">{err}</p>}

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3.5 rounded-[10px] text-[13px] font-medium text-white mt-5 mb-2.5 border-none transition-colors duration-300 ${
                loading
                  ? "bg-[#1a1814]/70 cursor-not-allowed"
                  : "bg-[#1a1814] cursor-pointer"
              }`}
            >
              {loading ? "Sending..." : "Send verification link"}
            </button>

            {/* cancel */}
            <button
              type="button"
              onClick={handleClose}
              className="w-full p-3.5 rounded-[10px] text-[13px] font-medium text-[#1a1814] cursor-pointer mb-2"
              style={{ border: "0.5px solid rgba(0,0,0,.15)" }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="px-5 pt-5 pb-2 flex flex-col items-center text-center">
          <div className="w-[52px] h-[52px] rounded-full bg-[#E1F5EE] flex items-center justify-center mx-auto mt-2 mb-3.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l3.5 3.5L13 4" />
            </svg>
          </div>

          <p className="text-[17px] font-medium text-[#1a1814] mb-2">
            Verification link sent!
          </p>
          <p className="text-[13px] text-[#6b6966] leading-relaxed mb-7">
            We sent a link to{" "}
            <span className="font-medium text-[#1a1814]">
              {getValues("newEmail")} {/* ← fixed, no more pendingEmail */}
            </span>
            . Click it to confirm your new address.
          </p>

          <button
            onClick={handleClose}
            className="w-full py-3 rounded-lg text-[13px] font-medium border border-black/20 text-[#1a1814]"
          >
            Done
          </button>
        </div>
      )}
    </BottomSheet>
  );
};

const Settings = ({ user: initialUser = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showStripeSheet, setShowStripeSheet]  = useState(false)
  const {user, settingUserNotificationPreferences, updateUserCategory, logout, loading, error: errorType, updateNewEmail, updateUserProfile, profileImagePreview} = useAuth();
  const {categories, error, reFetchCategory, isCategoryLoading } = useCategory();
  const {createAccount, checkStatus, accountStatus} = usePayment();
  const [stripeLoading, setStripeLoading] = useState(false);
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);
  const [showAccountSheet, setShowAccountSheet] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);

  const [showEmailSheet, setShowEmailSheet] = useState(false)
  const handleStripeConnect = async() => {
    try {
      if(accountStatus) return;
      const results = await createAccount()
      console.log(results)
      if (results?.onboardingUrl) {
        window.location.href = results?.onboardingUrl;
      }
    } catch (error) {
      console.error("Stripe onboarding failed:", error);
      // show toast or error UI here
    }
  };

  // console.log(user)
  const toggleCategory = async(categoryId) => {
    const isAdded = user.preferredCategories.includes(categoryId);

    if(isAdded && user.preferredCategories.length <= 2){
      toast.error("You must have at least 2 categories");
      return
    }

    try {
      await updateUserCategory(categoryId);
      toast.success("Category updated!");

    } catch (error) {
       dispatch(localCategoryPreferance({ key, value: !value }));
       toast.error("Failed to update preference");
    }
  };
    // setCategories((prev) => {
    //   const next = new Set(prev);
    //   next.has(cat) ? next.delete(cat) : next.add(cat);
    //   return next;
    // });

  

  const toggleNotificationPreference = async({ key, value }) => {
      try {
        dispatch(localNotificationPreferances({key, value}))
        settingUserNotificationPreferences({ key, value })
        toast.success("Preferance updated successfully")
      } catch (error) {
        // revert
        dispatch(localNotificationPreferances({ key, value: !value }));
        toast.error("Failed to update preference");
      }
  };

  // socialLinks — platform enum from schema
  const platforms = [
    "twitter",
    "linkedin",
    "instagram",
    "youtube",
    "discord",
    "other",
  ];
  const [socialLinks, setSocialLinks] = useState(
    initialUser?.socialLinks ?? []
  );
  const [showSocial, setShowSocial] = useState(false);

  const setSocialUrl = (platform, url) =>
    setSocialLinks((prev) => {
      const exists = prev.find((l) => l.platform === platform);
      if (exists)
        return prev.map((l) => (l.platform === platform ? { ...l, url } : l));
      return [...prev, { platform, url }];
  });
  return <SettingPage/>
};

export default Settings;
