import React, { useState } from "react";
import {Container} from "../../components/index.js";
import { RiArrowUpWideLine, RiArrowDownWideFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const Signup = () => {
  const [isHidden, setIsHidden] = useState(false)
  return (
    <div className="lg:bg-gray-700 py-4 rounded-lg lg:shadow-lg w-full font-roboto text-white max-w-[420px]">
      <Container>
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6 ">Sign Up</h2>
          {!isHidden ? (
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg transition text-gray-800 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
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
                Signup with Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="white"
                    d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"
                  ></path>
                </svg>
                Signup with Discord
              </button>
            </div>
          ) : (
            <>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Signup
                </button>
              </form>
            </>
          )}
          <div className=" px-1 mt-2 text-gray-200 font-roboto">
            <span>Already joined Grupio? </span>
            <Link to="#" className="text-gray-400 hover:underline">
              Login now
            </Link>
          </div>
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or Continue with Email</span>
            <hr className="flex-grow border-t border-gray-300" />
            <button onClick={() => setIsHidden(!isHidden)}>
              {!isHidden ? (
                <RiArrowDownWideFill size={24} />
              ) : (
                <RiArrowUpWideLine size={24} />
              )}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};


export default Signup;
