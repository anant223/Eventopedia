import React from "react";
import { Container, Login, Signup } from "../components/index.js";
import { motion } from "motion/react";
import { easeIn } from "motion";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const type = searchParam.get("type");

  return (
    <div className="py-8 md:py-16 lg:py-24 text-text font-bricolage w-full min-h-[80vh] ">
      <Container>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12">
          {/* Left Text Section - Responsive across all breakpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeIn }}
            className="w-full max-w-md flex flex-col items-center lg:items-start text-center lg:text-left px-4 sm:px-0 mb-6 lg:mb-0"
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl pb-2">
              {type === "login" ? "Welcome Back!" : "Welcome to Grupio"}
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-sm">
              {type === "login"
                ? "Log in to access your account and continue your journey with us."
                : "Join Grupio — The best place for professionals to connect, collaborate, and grow together."}
            </p>

            {/* Visual element for small screens */}
            <div className="w-16 h-1 bg-primary mt-4 mb-2 lg:hidden"></div>
          </motion.div>

          {/* Divider - Only shows on lg screens and up */}
          <div className="hidden lg:flex w-px bg-gray-300 dark:bg-gray-700 h-64 self-center" />

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeIn }}
            className="w-full max-w-md flex justify-center items-center px-4 sm:px-0"
          >
              {type === "login" ? (
                <Login signupFn={() => setSearchParam({ type: "signup" })} />
              ) : (
                <Signup loginFn={() => setSearchParam({ type: "login" })} />
              )}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
