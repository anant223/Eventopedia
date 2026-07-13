import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import SentConfirmation from './components/SentConfirmation';
import RequestForm from './components/RequestForm';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import { FormProvider, useForm } from 'react-hook-form';


const ForgetPasswordPage = () => {
    const [sent, setSent] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const methods = useForm({mode: "onTouched"});
    
    console.log(methods)

    const {forgetOldPassword} = useAuth()
    

    // Wire these to your actual auth hook, e.g. const { requestPasswordReset } = useAuth();
    // const handleSubmit = async ({ email }) => {
    //   setLoading(true);
    //   try {
    //     // await requestPasswordReset(email);
    //     console.log("requestPasswordReset:", email);
    //     setSubmittedEmail(email);
    //     setSent(true);
    //   } catch (err) {
    //     console.error(err);
    //     // toast.error("Couldn't send reset link. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const handleResend = async (data) => {
      setResending(true);
      try {
        // await requestPasswordReset(submittedEmail);
        console.log("resend to:", submittedEmail);
      } catch (err) {
        console.error(err);
      } finally {
        setResending(false);
      }
    };

   const handleSubmit = async (email) => {
     setLoading(true);

     try {
      console.log(typeof email, email);
      await forgetOldPassword(email);
       setSubmittedEmail(email);
       setSent(true);
     } catch (error) {
       console.error(error);
       toast.error("Failed to send link");
     } finally {
       setLoading(false);
     }
   };
  return (
    <div className="max-w-xl mx-auto px-4 pt-2 pb-16">
      <div className="text-center mb-2">
        <h1
          className="
              text-[clamp(1.25rem,2.5vw,1.75rem)]
              font-medium tracking-[-0.03em] text-[#1a1814]
            "
        >
          Reset your password.
        </h1>
        <p className="text-sm text-[#6b6966] mt-1.5">
          We'll get you back into Grupio in no time
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
          {sent ? (
            <SentConfirmation
              key="sent"
              email={submittedEmail}
              onResend={handleResend}
              resending={resending}
            />
          ) : (
            <FormProvider {...methods}>
              <RequestForm
                key="form"
                onSubmit={handleSubmit}
                loading={loading}
              />
            </FormProvider>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ForgetPasswordPage
