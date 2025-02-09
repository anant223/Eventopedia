import React from 'react'
import { Button, Container,  } from "../index.js";
import { howitwork } from '../../utils/constant.js';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWork = () => {
 
  return (
    <section className="text-text py-12 sm:py-24 font-bricolage overflow-x-hidden ">
      <Container>
        <div className="w-full rounded flex text-gray-400 bg-[#0c1725] py-24 px-12 relative flex-col">
          <div className=" flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }} className={` sm:w-80 text-center p-4 rounded shadow-lg`}>
              <h2 className=" text-2xl sm:text-3xl font-bold">{howitwork[0].title}</h2>
              <p className="pt-4 text-base sm:text-2xl">{howitwork[0].description}</p>
            </motion.div>
          </div>
          <div className="text-center flex justify-center flex-col items-center w-full h-full p-8">
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
          <div className="flex justify-between text-gray-400">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={` sm:w-80  p-4 rounded text-center shadow-lg`}
            >
              <h2 className="text-2xl sm:text-3xl font-bold">{howitwork[1].title}</h2>
              <p className="pt-4 text-base sm:text-2xl">{howitwork[1].description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={` sm:w-80 p-4 rounded text-center  shadow-lg`}
            >
              <h2 className=" text-2xl sm:text-3xl font-bold">{howitwork[2].title}</h2>
              <p className="pt-4 text-base sm:text-2xl">{howitwork[2].description}</p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HowItWork

