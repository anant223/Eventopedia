import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../index";


const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <section id="home" className="text-text min-h-dvh flex items-center bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-[40px] sm:py-[80px] w-full">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bold mb-6 text-[clamp(2rem,5vw,4.2rem)] leading-tight"
          >
            The <span>ultimate</span> <span>Platform to </span>
            <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent font-CS">
              Host/Attend
            </span>{" "}
            <span>live </span>
            <span className="">events.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl font-medium mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
          >
            GRUPIO lets you host and stream virtual events — public or private —
            and connect with professionals in real-time, straight from your
            browser.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={handleClick}
            className="bg-primary text-black font-semibold px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-xl rounded-[30px] rounded-tr-none hover:rounded-tr-[30px] transition-all duration-300"
          >
            Register
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

{/* <div className=" mt-[] max-w-[700px] mx-auto">
  <motion.h1
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className=" text-5xl sm:text-6xl sm:text-left font-bold"
  >
    The ultimate <br /> Platform to <br />
    <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent font-CS">
      Host/Attend
    </span>{" "}
    <br />
    live events.
  </motion.h1>
  <motion.p
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="m-[10px_0px_30px] sm:text-base font-roboto"
  >
    GRUPIO lets you host and stream virtual events — public or private — and
    connect with professionals in real-time, straight from your browser.
  </motion.p>
  <motion.button
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="inline-block  bg-gradient-to-r from-[#df4881] to-[#c430d7] rounded-[30px] p-[14px_40px] rounded-tr-none text-[14px] font-semibold hover:rounded-tr-[30px] hover:transition-all hover:duration-300"
  >
    Join In
  </motion.button>
</div>; */}


//  <Container>
//    <div className="py-2 md:py-4 lg:py-8">
//      <div className="max-w-lg">
//        <motion.h1
//          initial={{ opacity: 0, y: 40 }}
//          animate={{ opacity: 1, y: 0 }}
//          transition={{ duration: 0.8, delay: 0.2 }}
//          className="scroll-mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold font-bricolage tracking-tight space-y-2"
//        >
//          <span className="block">The ultimate</span>
//          <span className="block">Platform to</span>
//          <span className="bg-gradient-to-tr from-secondary via-primary to-accent bg-clip-text text-transparent block font-CS">
//            Host / Attend
//          </span>
//          <span className="block">live workshops.</span>
//        </motion.h1>

//        <motion.p
//          initial={{ opacity: 0, y: 30 }}
//          animate={{ opacity: 1, y: 0 }}
//          transition={{ duration: 0.8, delay: 0.5 }}
//          className="mt-6 text-base sm:text-lg lg:text-xl font-bricolage leading-snug text-muted-foreground"
//        >
//          GRUPIO is a professional hosting & streaming platform for virtual
//          private and public events — allowing you to engage with professionals,
//          all in your browser.
//        </motion.p>

//        <motion.div
//          initial={{ opacity: 0, y: 20 }}
//          animate={{ opacity: 1, y: 0 }}
//          transition={{ duration: 0.8, delay: 0.6 }}
//          className="mt-8"
//        >
//          <button
//            onClick={handleClick}
//            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-gray-900 text-base sm:text-lg font-bold transition-all duration-300 hover:-translate-y-1"
//          >
//            Get Started
//          </button>
//        </motion.div>
//      </div>
//    </div>
//  </Container>;