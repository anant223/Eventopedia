import React, { useState } from 'react'

const HamburgerButton = ({ status, handleClick }) => {
  return (
    <div className=" z-50 relative">
      <div
        className={`w-[38px] h-6 cursor-pointer flex flex-col justify-center items-center relative z-10`}
        onClick={handleClick}
      >
        <div
          className={`w-full h-1 bg-slate-200 rounded-md absolute transform transition-transform duration-300 ease-in-out ${
            status ? "rotate-45" : "translate-y-[-8px]"
          }`}
        ></div>
        <div
          className={`w-full h-1 bg-slate-200 rounded-md transform transition-opacity duration-150 ease-in-out ${
            status ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-full h-1 bg-slate-200 rounded-md absolute transform transition-transform duration-300 ease-in-out ${
            status ? "-rotate-45" : "translate-y-[8px]"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default HamburgerButton;