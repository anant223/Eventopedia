import React from 'react'
import {SocialAuthButtons} from '../index'

const AuthContainer = ({title, children}) => {
  return (
    <div className="sm:bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] text-text p-6 sm:p-8 rounded-lg sm:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] sm:hover:shadow-[rgba(46,_26,_134,_0.3)_0px_10px_30px]">
      <div className=" max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          {title}
        </h2>
        <SocialAuthButtons />
        <div className="relative mb-8">
          <div className=" absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] text-text">
              Or continue with email
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthContainer