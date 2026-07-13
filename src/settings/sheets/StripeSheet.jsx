import ResponsiveModal from "@/components/my-ui/Sheet";
import usePayment from "@/hooks/usePayment";
import { useState } from "react";
import { toast } from "sonner";

const Feature = ({ children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 12px",
    }}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#1D9E75"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M3 8l3.5 3.5L13 4" />
    </svg>
    <span style={{ fontSize: 13, color: "#1a1814" }}>{children}</span>
  </div>
);

const StripeSheet = ({ open, onClose}) => {
  const [submitting, setSubmitting] = useState(false);
  const {createAccount} = usePayment()

  const handleContinue = async () => {
    setSubmitting(true);
    try {
      const res = await createAccount();
      if (res?.onboardingUrl) {
        window.open(res.onboardingUrl, "_blank");
      } else {
        toast.error("Could not generate Stripe link. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }   finally {
      setSubmitting(false);
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onClose}>
      <div style={{ padding: "20px 20px 0" }}>

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
          disabled={submitting}
          style={{
            width: "100%", padding: 13, borderRadius: 10, fontSize: 13,
            fontWeight: 500, background: "#1a1814", color: "#f2eee7",
            border: "none", cursor: "pointer", marginBottom: 10,
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "Redirecting…" : "Continue with Stripe"}
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
    </ResponsiveModal>
  );
};

export default StripeSheet;