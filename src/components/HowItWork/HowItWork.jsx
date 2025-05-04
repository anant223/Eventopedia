import React from 'react'
import { Button, Container,  } from "../index.js";
import { howitwork } from '../../utils/constant.js';
import { ArrowRight, CheckCircle, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWork = () => {
 
  return (
    <section
      id="how-it-works"
      className="text-text py-12 sm:py-24 font-bricolage overflow-x-hidden"
    >
      <Container>
        <div className="w-full rounded-2xl bg-gradient-to-b from-[#0c1725] to-[#131f30] py-24 px-6 sm:px-12 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          {/* Main content */}
          <div className="relative">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              >
                How it works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg sm:text-xl text-gray-400"
              >
                Simple. Intuitive. Magical.
              </motion.p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
              {howitwork.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-[#0c1725] rounded-xl p-8 h-full transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="flex justify-center mb-6">
                      {index === 0 && (
                        <Zap size={40} className="text-blue-400" />
                      )}
                      {index === 1 && (
                        <Settings size={40} className="text-purple-400" />
                      )}
                      {index === 2 && (
                        <CheckCircle size={40} className="text-green-400" />
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-400">
                      {step.description}
                    </p>
                    {index < 2 && (
                      <div className="hidden sm:block absolute top-1/2 right-[-2rem] transform -translate-y-1/2">
                        <ArrowRight className="text-gray-600" size={24} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HowItWork

