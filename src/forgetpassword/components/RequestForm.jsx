import { Field } from "@/auth/components/Components";
import { useFormContext } from "react-hook-form";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";


const RequestForm = ({ onSubmit, loading=false })=> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <h1 className="text-[18px] font-semibold text-[#1a1814] tracking-[-0.02em]">
        Forgot your password?
      </h1>
      <p className="text-[13.5px] text-[#6b6966] mt-1.5 mb-6 leading-relaxed">
        Enter the email linked to your account and we'll send you a link to
        reset it.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset
          disabled={loading}
          className="flex flex-col gap-1.5 disabled:opacity-70"
        >
          <div>
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="text-[12px] text-red-500 mt-0.5"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              h-11 bg-[#1a1814] text-white rounded-xl
              text-[14px] font-bold tracking-[-0.1px]
              transition-all hover:bg-[#2c2926]
              active:scale-[0.99]
              disabled:opacity-60 disabled:cursor-not-allowed
              mt-2
            "
          >
            {loading ? "Sending link..." : "Send reset link"}
          </button>
        </fieldset>
      </form>

      <Link
        to="/auth?type=login"
        className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#8a8480] hover:text-[#1a1814] mt-5 transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to log in
      </Link>
    </motion.div>
  );
}

export default RequestForm;
