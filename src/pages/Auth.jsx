import React from "react";
import { Container, Login, Signup } from "../components/index.js";
import { motion } from "motion/react";
import { easeIn } from "motion";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const type = searchParam.get("type");

  return (
    <div className="py-24 text-text font-bricolage w-full flex-col gap-8">
      <Container>
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Left Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
            className="w-full max-w-md sm:flex hidden flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h1 className="font-bold text-4xl pb-2">
              {type === "login" ? "Welcome Back!" : "Welcome to Grupio"}
            </h1>
            <p className="text-lg">
              {type === "login"
                ? "Log in to access your account."
                : "Grupio — The best place for professionals to connect and grow."}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:flex w-px bg-gray-800 mx-4" />

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
            className="w-full max-w-md flex justify-center"
          >
            {type === "login" ? (
              <Login signupFn={(view) => setSearchParam({ type: view })} />
            ) : (
              <Signup loginFn={(view) => setSearchParam({ type: view })} />
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
