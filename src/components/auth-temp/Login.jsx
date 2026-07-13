import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {useNavigate } from 'react-router-dom';
import { Lock, Mail} from 'lucide-react';
import { AuthContainer} from './index.js';
import { AppButton, AppInput, LoadingSpinner } from '../common/index.js';
import {  motion } from 'framer-motion';
import { toast } from 'sonner';

const Login = ({signupFn, loginFn}) => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState : {errors, isSubmitting}, } = useForm();

  
 const handleSession = async (data) => {
   try {
      console.log(data)
     await loginFn(data);
     toast.success("Login successfully");
     navigate("/main/all-events");
   } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect email/password.");
      } else {
        toast.error(error.message || "Login failed. Please try again.");
      }
   }
 };
console.log(isSubmitting)
  return (
    <>
      <AuthContainer title="Sign In Your Account">
        {isSubmitting && <LoadingSpinner />}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-6"
          onSubmit={handleSubmit(handleSession)}
        >
          <AppInput
            type="email"
            label="Email address"
            name="email"
            placeholder="Enter your email"
            id="email"
            autoComplete="email"
            Icon={Mail}
            error={errors}
            disabled={isSubmitting}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <div>
            <AppInput
              type="password"
              label="Enter password"
              name="password"
              placeholder="Enter your password"
              id="password"
              autoComplete="current-password"
              Icon={Lock}
              error={errors}
              disabled={isSubmitting}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <AppButton
              disabled={isSubmitting}
              className="w-full"
              type="submit"
              buttonStyle="manual"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  Signing in...
                </div>
              ) : (
                "Sign in"
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
            disabled={isSubmitting}
            className="w-full"
            onClick={() => signupFn("signup")}
            buttonStyle={"ghost"}
            size="sm"
          >
            Create Grupio Account
          </AppButton>
        </motion.div>
      </AuthContainer>
    </>
  );
}

export default Login


