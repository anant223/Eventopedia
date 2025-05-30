import React, { useState } from "react";
import { RiArrowUpWideLine, RiArrowDownWideFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { signUp } from "../../features/authActions.js";


const Signup = ({loginFn}) => {
  const [isHidden, setIsHidden] = useState(false)
 
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm()


  const handleGoogleSignup = async () => {
    window.location.href =
      "https://eventopida-server.onrender.com/api/v1/users/google/auth";
  };
  const handleDiscordSignup = async () => {
    window.location.href =
      "https://eventopida-server.onrender.com/api/v1/users/discord/auth";
  };
  

  

  return (
    <div className="  from-[#0c1725] via-[#0e1c2f] to-[#0c1725] text-text p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
        Sign Up
      </h2>

      {!isHidden ? (
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg transition bg-white text-gray-800 hover:bg-gray-50 text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="flex-shrink-0"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span className="whitespace-nowrap">Sign Up with Google</span>
          </button>
          <button onClick={handleDiscordSignup} className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition w-full text-sm sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="flex-shrink-0"
            >
              <path
                fill="white"
                d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"
              ></path>
            </svg>
            <span className="whitespace-nowrap">Sign Up with Discord</span>
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(signUp)}
          className="flex flex-col gap-3 sm:gap-4"
        >
          <div className=" relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register("username", {
                required: "username is required",
              })}
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register("email", { required: true })}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register("password", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="px-3 py-2 sm:px-4 sm:py-2 bg-primary text-black font-medium rounded-lg hover:bg-blue-200 transition text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>
      )}

      <div className="my-4 sm:my-6 flex items-center">
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        <span className="mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
          Or Continue with Email
        </span>
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        <button
          onClick={() => setIsHidden(!isHidden)}
          className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {!isHidden ? (
            <RiArrowDownWideFill size={20} />
          ) : (
            <RiArrowUpWideLine size={20} />
          )}
        </button>
      </div>

      <div>
        <p className="text-center sm:text-left text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-roboto">
          Already have an account?{" "}
          <button
            onClick={() => loginFn("login")}
            className="text-blue-500 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;

