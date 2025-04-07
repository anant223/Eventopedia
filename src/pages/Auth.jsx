import React from "react";
import { Login, Signup } from "../components/index.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "motion/react";
import { easeIn } from "motion";

const Auth = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
        className="w-1/2 lg:flex hidden items-center justify-center text-text flex-col"
      >
        <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-xl">Sign in to access your account.</p>
      </motion.div>
      <div className=" w-0.5 h-screen bg-gray-800 hidden lg:flex"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
        className="lg:w-1/2 w-full flex justify-center items-center flex-col"
      >
        <Login />
      </motion.div>
    </div>
  );
};

export default Auth;
{
  /* Left Side - Illustration or Image */
}
<div className="hidden lg:flex w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 items-center justify-center">
  <div className="text-white text-center">
    
  </div>
</div>;

{
  /* Right Side - Login Form */
}
<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
  <div className="w-full max-w-md">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
    <form className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Login
      </button>
    </form>

    {/* Divider */}
    <div className="flex items-center my-6">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">OR</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>

    {/* Google Sign-In Button */}
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin theme="filled_blue" size="large" shape="pill" width="100%" />
    </GoogleOAuthProvider>

    {/* Additional Links */}
    <div className="mt-6 text-center">
      <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
        Forgot Password?
      </a>
      <span className="mx-2 text-gray-400">|</span>
      <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
        Create an Account
      </a>
    </div>
  </div>
</div>;