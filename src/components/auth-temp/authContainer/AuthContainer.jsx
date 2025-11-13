import React from 'react'
import {SocialAuthButtons} from '../index'
import { motion } from 'framer-motion'




const AuthContainer = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="sm:bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] text-white p-6 sm:p-8 rounded-lg sm:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] sm:hover:shadow-[rgba(46,_26,_134,_0.3)_0px_10px_30px] transition-shadow duration-300 relative"
  >
    <div className="max-w-md mx-auto">
      <motion.h2
        key={title}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl font-semibold text-center mb-8"
      >
        {title}
      </motion.h2>
      <SocialAuthButtons />
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] text-gray-300">
            Or continue with email
          </span>
        </div>
      </div>
      {children}
    </div>
  </motion.div>
);
export default AuthContainer