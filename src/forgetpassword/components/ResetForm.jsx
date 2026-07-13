import React from 'react'
import { Field } from "@/auth/components/Components";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ResetForm = ({onSubmit, loading}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useFormContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <h1 className="text-[18px] font-semibold text-[#1a1814] tracking-[-0.02em]">
        Set new password
      </h1>
      <p className="text-[13.5px] text-[#6b6966] mt-1.5 mb-6 leading-relaxed">
        Must be at least 8 characters and include a letter and a number.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset
          disabled={loading}
          className="flex flex-col gap-1.5 disabled:opacity-70"
        >
          <div>
            <Field
              label="New password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              error={errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "Password must include a letter and a number",
                },
              })}
            />

            <Field
              label="Confirm new password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => val === getValues("password") || "Passwords don't match",
              })}
            />
            {errors.root.message && (
              <p role="alert" className="text-[12px] text-red-500 mt-0.5">
                {errors.root.message}
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
            {loading ? "Updating password…" : "Update password"}
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

export default ResetForm
