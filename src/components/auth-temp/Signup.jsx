import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../features/authActions.js";
import { Lock, Mail, User } from "lucide-react";
import { AuthContainer} from "./index.js";
import { AppButton, AppInput } from "../common/index.js";
import {motion} from "framer-motion";


const Signup = ({loginFn}) => {
  const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm()

  return (
    <AuthContainer title="Create Your Grupio">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-6"
        onSubmit={handleSubmit(signUp)}
      >
        <AppInput
          type="text"
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          id="name"
          Icon={User}
          error={errors}
          {...register("name", {
            required: "name is required",
            minLength: {
              value: 2,
              message: "name must be at least 2 characters",
            },
            maxLength: {
              value: 20,
              message: "name must be less than 20 characters",
            },
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message:
                "name can only contain letters, spaces, hyphens, and apostrophes",
            },
          })}
        />
        <AppInput
          type="email"
          label="Email address"
          name="email"
          placeholder="Enter your email"
          id="email"
          autoComplete="email"
          Icon={Mail}
          error={errors}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <AppInput
          type="password"
          label="Enter password"
          name="password"
          placeholder="Enter your password"
          id="password"
          autoComplete="current-password"
          Icon={Lock}
          error={errors}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters",
            },
          })}
        />
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <AppButton className="w-full" type="submit" buttonStyle={"manual"}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
              </div>
            ) : (
              "Sign up"
            )}
          </AppButton>
        </motion.div>
      </motion.form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4"
      >
        <AppButton
          className="w-full"
          onClick={loginFn}
          size="sm"
          buttonStyle="ghost"
        >
          Click to log in
        </AppButton>
      </motion.div>
    </AuthContainer>
  );
};

export default Signup;

