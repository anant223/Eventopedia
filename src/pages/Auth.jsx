import React from "react";
import { Login, Signup } from "../components/index.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "motion/react";
import { easeIn } from "motion";

const Auth = () => {
  return (
    <div className="min-h-screen flex bg-background font-roboto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
        className="w-1/2 lg:flex hidden max-w-md mx-auto py-[180px] text-text flex-col"
      >
        <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg">Sign in to access your account.</p>
      </motion.div>
      <div className=" w-0.5 h-screen bg-gray-800 hidden lg:flex"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
        className="w-full mx-auto max-w-md sm:pt-[80px]"
      >
        <Login />
      </motion.div>
    </div>
  );
};

export default Auth;
