import React from 'react'
import { Button, Container, FeaturesCard } from "../index.js";
import { howitwork } from '../../utils/constant.js';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWork = () => {
 

  return (
    <section className="text-text py-24 font-bricolage overflow-x-hidden ">
      <Container>
        <div className="w-full rounded flex bg-[#0c1725] py-24 px-12 relative flex-col">
          <div className="flex justify-between gap-2">
            <div className=" w-96 bg-background"></div>
            <div className=" w-96 bg-background"></div>
          <div className=" text-center flex justify-center flex-col items-center w-full">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-3 md:mb-4"
            >
              How it works ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-gray-400"
            >
              Simple. Intuitive. Magical.
            </motion.p>
          </div>
          </div>
          <div className=" w-96 bg-background"></div>
        </div>
      </Container>
    </section>
  );
}

export default HowItWork

//  <div className="text-text">
//   <Container>
//     <div className="bg-[#0c1725] flex flex-col items-center w-full py-12">
//       {/* Centered Title and Description */}
//       <div className="text-center mb-12">
//         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-3 md:mb-4">
//           How it works
//         </h2>
//         <p className="text-lg sm:text-xl text-gray-400">
//           Simple. Intuitive. Magical.
//         </p>
//       </div>

//       {/* Surrounding Information */}
//       <div className="flex w-full justify-between items-center">
//         <div>
//           <div className="inverted-radius bg-background"></div>
//         </div>
//         <div>
//           {/* Add your content or components here */}
//           <p className="text-lg text-gray-300">
//             This is some information about how it works.
//           </p>
//         </div>
//         <div>
//           <div className="inverted-radius bg-background"></div>
//         </div>
//       </div>
//     </div>
//   </Container>
// </div>
{/* <div className="text-text py-12 md:py-16 lg:py-24 font-roboto">
      {/* Header Section */}
    //   <div className=" ">
    //     <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-center mb-3 md:mb-4">
    //       How it works
    //     </h2>
    //     <p className="text-lg sm:text-xl text-gray-400 text-center mb-12 md:mb-16 lg:mb-20">
    //       Simple. Intuitive. Magical.
    //     </p>

    //     {/* Steps Section */}
    //     <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory group-hover:block pl-4 sm:pl-44">
    //       <div className="inline-flex  space-x-4 text-gray-200 text-xl font-bold">
    //         {howitwork.map((step, index) => (
    //           <motion.div key={index} className="inverted-radius "></motion.div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="text-center mt-6 md:mt-12 lg:mt-18">
    //       <p className="text-lg sm:text-xl text-gray-400 mb-4 md:mb-6">
    //         Ready to experience the difference?
    //       </p>
    //       <button className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-100 transition-colors duration-300">
    //         Get Started
    //       </button>
    //     </div>
    //   </div>
    // </div> 
