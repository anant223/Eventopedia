import React, { useState } from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { useNavigate, useSearchParams } from 'react-router-dom';
import InvalidTokenState from './components/InvalidTokenState';
import SuccessState from './components/SuccessState';
import ResetForm from './components/ResetForm';
import { FormProvider, useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';

const ResetPasswordPage = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)
 
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    console.log(token)

    const [state, setState] = useState(!token ? "invalid" : "form");

    const {createNewPassword} = useAuth()
    const methods = useForm({mode: "onTouched"})

  
    const handlePasswordSubmit = async (credentials) => {
      setErr("");
      setLoading(true);
      try {
        const {password} = credentials
        await createNewPassword({ token, password });
        setState("success");
      } catch (err) {
        const status = err?.response?.status;
        if (status === 400 || status === 410) {
          setState("invalid");
        } else {
          setErr(
            err?.response?.data?.message ||
            "Couldn't reset your password. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="max-w-xl mx-auto px-4 pt-2 pb-16">
      <div className="text-center mb-2">
        <h1 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#1a1814]">
          Reset your password.
        </h1>
        <p className="text-sm text-[#6b6966] mt-1.5">
          Choose something strong and new.
        </p>
      </div>
      <motion.div
        className="
            relative z-[2] w-full max-w-[400px] mx-auto
            bg-transparent px-4
            sm:bg-white sm:px-7 sm:pt-7 sm:pb-6
            sm:rounded-3xl sm:border sm:border-black/[0.08]
            sm:shadow-[0_2px_24px_rgba(0,0,0,0.05)]
          "
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <AnimatePresence mode="wait">
          <FormProvider {...methods}>
            {state === "form" && (
              <ResetForm
                key="form"
                onSubmit={handlePasswordSubmit}
                loading={loading}
                serverError={err}
              />
            )}
          </FormProvider>
          {state === "success" && <SuccessState key="success" />}
          {state === "invalid" && <InvalidTokenState key="invalid" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ResetPasswordPage
