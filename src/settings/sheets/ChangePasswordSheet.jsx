import ResponsiveModal from "@/components/my-ui/Sheet";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";

const STRENGTH_COLOR = ["", "#D85A30", "#BA7517", "#1D9E75", "#0F6E56"];
const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];


const getStrength = (val) => {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  return score;
};

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
const ChangePasswordSheet = ({ open, onClose }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    }
  });
  
  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");
  const strength = getStrength(newPassword);
  const confirmPassword = watch("confirmPassword");

  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const {changePassword} = useAuth()

  const handleClose = () => {
    reset();
    setError("");
    setSaved(false);
    onClose();
  };

  const handlePasswordUpdate = async (data) => {

    setLoading(true);
    setError("")
    console.log("hello data", data)
    try {
      const {password, newPassword} = data
      await changePassword({password, newPassword});
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
    <ResponsiveModal open={open} onOpenChange={handleClose}>
      <div className="px-5 pt-5">
        {/* icon */}
        <form onSubmit={handleSubmit(handlePasswordUpdate)}>
          <div className="w-[52px] h-[52px] rounded-full bg-[#f0ede6] flex items-center justify-center mx-auto mt-2 mb-[14px]">
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

          <p className="text-[17px] font-medium text-[#1a1814] text-center mb-5">
            Change password
          </p>

          <label className="block text-[12px] font-medium text-[#9b9890] mb-[6px]">
            Current password
          </label>
          <input
            type={showNew ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", {
              required: "Enter your current password.",
            })}
            className="w-full bg-[#f8f7f5] border border-black/10 rounded-[10px] py-[10px] pr-10 pl-3 text-[13px] text-[#1a1814] outline-none focus:border-black/40 focus:bg-white"
          />

          {/* new password */}
          <div className="my-[14px]">
            <label className="block text-[12px] font-medium text-[#9b9890] mb-[6px]">
              New password
            </label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="••••••••"
                {...register("newPassword", {
                  required: "New Passwrod required",
                  validate: (val) => {
                    if (val === oldPassword) {
                      return "Password must be new.";
                    }
                    if (strength < 2) {
                      return "Password is too weak.";
                    }
                    return true;
                  },
                })}
                className="w-full bg-[#f8f7f5] border border-black/10 rounded-[10px] py-[10px] pr-10 pl-3 text-[13px] text-[#1a1814] outline-none focus:border-black/40 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#9b9890] p-0"
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

            {newPassword.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-[3px] rounded-[2px] transition-colors"
                      style={{
                        background:
                          i <= strength ? STRENGTH_COLOR[strength] : "#e0ddd8",
                      }}
                    />
                  ))}
                </div>

                <p
                  className="text-[11px] font-medium mt-1"
                  style={{ color: STRENGTH_COLOR[strength] }}
                >
                  {STRENGTH_LABEL[strength]}
                </p>
              </div>
            )}

            {!newPassword.length && (
              <p className="text-[11px] text-[#9b9890] mt-[5px]">
                Use 8+ characters with uppercase, numbers & symbols
              </p>
            )}
          </div>

          {/* confirm */}
          <div className="mb-1">
            <label className="block text-[12px] font-medium text-[#9b9890] mb-[6px]">
              Confirm new password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (val !== newPassword) {
                    return "Password don't match";
                  }
                  return true;
                },
              })}
              className={`w-full rounded-[10px] py-[10px] px-3 text-[13px] text-[#1a1814] outline-none bg-[#f8f7f5] focus:bg-white ${
                confirmPassword
                  ? "border border-[#D85A30]/50"
                  : "border border-black/10"
              }`}
            />

            {confirmPassword &&
              (confirmPassword !== newPassword) &&
              (
                <p className="text-[11px] text-[#D85A30] mt-[5px]">
                  Passwords don't match
                </p>
              )}
          </div>

          {error && (
            <p className="text-[12px] text-[#D85A30] mt-[10px]">{error}</p>
          )}

          <button
            disabled={loading || saved}
            className={`w-full py-[13px] rounded-[10px] text-[13px] font-medium text-white mt-5 mb-[10px] transition-colors ${
              saved ? "bg-[#1D9E75]" : "bg-[#1a1814]"
            }`}
          >
            {saved
              ? "Password updated!"
              : loading
                ? "Updating…"
                : "Update password"}
          </button>

          <button
            onClick={handleClose}
            className="w-full py-[13px] rounded-[10px] text-[13px] font-medium bg-transparent border border-black/15 text-[#1a1814] cursor-pointer mb-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </ResponsiveModal>
  );
};

export default ChangePasswordSheet;