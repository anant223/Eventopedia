import React from 'react'
import { Button, Card, Container,  } from "../index.js";
import { ArrowRight, CheckCircle, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';


const HowItWork = () => {

 const iconStyle = "w-8 h-8 sm:w-12 sm:h-12 text-primary mb-4";

 const howItWorks = [
   {
     step: 1,
     icon: <Zap className={iconStyle} />,
     title: "Create Your Account",
     description:
       "Sign up in seconds and personalize your profile to get started.",
   },
   {
     step: 2,
     icon: <Settings className={iconStyle} />,
     title: "Host or Join an Event",
     description:
       "Browse available events or set up your own with a few clicks.",
   },
   {
     step: 3,
     icon: <CheckCircle className={iconStyle} />,
     title: "You're All Set!",
     description: "Hop in and start engaging with your audience or community.",
   },
 ];

  return (
    <section className="text-text overflow-x-hidden font-bricolage py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="w-full rounded bg-[#0c1725] flex flex-col items-center lg:px-14 lg:py-24 px-6 py-12 gap-10">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-1">
              How it works
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Simple. Intuitive. Magical.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {howItWorks.map((fn, index) => (
              <div key={index} className="w-full max-w-[300px]">
                <Card img={fn.icon} title={fn.title} desc={fn.description} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HowItWork

{/* <section
      className="text-text py-12 sm:py-24 font-bricolage overflow-x-hidden"
    >
      <Container>
        <div className="w-full rounded-2xl bg-gradient-to-b from-[#0c1725] to-[#131f30] py-24 px-6 sm:px-12 relative">
          {/* Background decoration */}
    //       <div className="absolute inset-0 overflow-hidden rounded-2xl">
    //         <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    //         <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    //       </div>

    //       {/* Main content */}
    //       <div className="relative">
    //         {/* Header */}
    //         <div className="text-center mb-16">
    //           <motion.h2
    //             initial={{ opacity: 0, y: 40 }}
    //             whileInView={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 0.8 }}
    //             viewport={{ once: true }}
    //             className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
    //           >
    //             How it works
    //           </motion.h2>
    //           <motion.p
    //             initial={{ opacity: 0, y: 20 }}
    //             whileInView={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 0.8, delay: 0.1 }}
    //             viewport={{ once: true }}
    //             className="text-lg sm:text-xl text-gray-400"
    //           >
    //             Simple. Intuitive. Magical.
    //           </motion.p>
    //         </div>

    //         {/* Steps */}
    //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
    //           {howitwork.map((step, index) => (
    //             <motion.div
    //               key={index}
    //               initial={{ opacity: 0, y: 40 }}
    //               whileInView={{ opacity: 1, y: 0 }}
    //               transition={{ duration: 0.8, delay: index * 0.2 }}
    //               viewport={{ once: true }}
    //               className="relative group"
    //             >
    //               <div className="bg-[#0c1725] rounded-xl p-8 h-full transition-transform duration-300 group-hover:-translate-y-2">
    //                 <div className="flex justify-center mb-6">
    //                   {index === 0 && (
    //                     <Zap size={40} className="text-blue-400" />
    //                   )}
    //                   {index === 1 && (
    //                     <Settings size={40} className="text-purple-400" />
    //                   )}
    //                   {index === 2 && (
    //                     <CheckCircle size={40} className="text-green-400" />
    //                   )}
    //                 </div>
    //                 <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
    //                   {step.title}
    //                 </h3>
    //                 <p className="text-base sm:text-lg text-gray-400">
    //                   {step.description}
    //                 </p>
    //                 {index < 2 && (
    //                   <div className="hidden sm:block absolute top-1/2 right-[-2rem] transform -translate-y-1/2">
    //                     <ArrowRight className="text-gray-600" size={24} />
    //                   </div>
    //                 )}
    //               </div>
    //             </motion.div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </Container>
    // </section> 


