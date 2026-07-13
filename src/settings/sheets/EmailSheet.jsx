import ResponsiveModal from "@/components/my-ui/Sheet";
import useAuth from "@/hooks/useAuth";
import { Eye, EyeOffIcon, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EmailSheet = ({ open, onClose }) => {
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, updateNewEmail, changeEmailError } = useAuth();

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
    setLoading(true);
    setErr(null);
    try {
      const { newEmail, password } = data;
      await updateNewEmail({ newEmail, password });
     setSaved(true);
      setTimeout(() => handleClose(), 4000);
    } catch (e) {
      setErr(changeEmailError || "Something went wrong. Please try again.");
      setLoading(false);
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
    <ResponsiveModal open={open} onOpenChange={handleClose}>
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
    </ResponsiveModal>
  );
};

export default EmailSheet;