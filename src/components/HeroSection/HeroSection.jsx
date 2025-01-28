import React from "react";
import browserImg from "../../assets/browser-removebg.png";
import video from "../../assets/video.mp4"
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/main");
  }
  return (
    <section className="isolate font-roboto bg-[#F5F5F7] flex justify-center w-full overflow-hidden" style={{backgroundImage: "url(../assets/images/mentor/mentor-glow.svg)"}}>
      <div className="pt-24 sm:max-w-7xl mx-auto flex justify-center flex-col items-center ">
        <div className=" text-center sm:max-w-2xl">
          <div className="mx-6">
            <h1 className="text-3xl font-[500] sm:text-4xl sm:mt-24">
              The best way to{" "}
              <span className="text-gray-600  font-bold">
                Connect, Collaborate and learn{" "}
              </span>
              <span className=" font-aus font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                live{" "}
              </span>
              or have a fun.
            </h1>
            <p className=" hidden sm:block mt-6 text-[19px] leading-snug text-gray-600 sm:text-xl">
              GRUPIO is a live streaming platform in your browser. Host your
              webinar/workshop, or have vertiual party with y friends, talk to
              One-on-One with professionals or love ones, and more.
            </p>
          </div>
          <div className="mt-6 flex justify-center z-30 items-center absolute left-0 right-0">
            <button onClick={handleClick} className=" font-bold text-lg bg-black text-gray-200 px-3 py-2 sm:px-6 sm:py-3 rounded w-fit">
              Get Started
            </button>
          </div>
        </div>
        <div className="relative mt-6 sm:mt-1">
          <div className="relative">
            <img
              src={browserImg}
              className=" lg:w-[1250px] lg:h-[1040px] h-[380px] object-cover bg-transparent md:h-[780px] sm:h-[620px] "
              alt="Background"
            />
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <video
              src={video}
              autoPlay
              muted
              loop
              className=" w-[380px] lg:w-[1020px] lg:h-[680px] md:h-[510px] md:w-[780px] lg:pt-[4.5rem] md:pt-14 md:pb-2 md:px-6 lg:px-5 sm:rounded-3xl h-[230px] object-cover px-4 pt-5 rounded-xl lg:pb-2 sm:w-[620px] sm:h-[400px] sm:pb-2 sm:pt-10 sm:px-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;