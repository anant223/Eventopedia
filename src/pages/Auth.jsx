import React from "react";
import { Login, Signup } from "../components/index.js";
import { motion } from "motion/react";
import { easeIn } from "motion";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const type = searchParam.get("type");

  return (
    <div className="min-h-screen flex bg-background font-roboto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
        className="w-1/2 lg:flex hidden max-w-md mx-auto text-text flex-col justify-center"
      >
        <h1 className="text-5xl font-bold mb-4">
          {type === "login" ? "Welcome Back!" : "Welcome to Grupio"}
        </h1>
        <p className="text-lg text-gray-600">
          {type === "login"
            ? "Log in to access your account."
            : "Grupio — The best place for professionals to connect and grow."}
        </p>
      </motion.div>
      <div className=" w-0.5 h-screen bg-gray-800 hidden lg:flex"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easeIn }}
        className="w-full mx-auto max-w-md flex justify-center items-center"
      >
        {console.log(searchParam)}
        {type === "login" ? (
          <Login signupFn={(view) => setSearchParam({ type: view })} />
        ) : (
          <Signup loginFn={(view) => setSearchParam({ type: view })} />
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
