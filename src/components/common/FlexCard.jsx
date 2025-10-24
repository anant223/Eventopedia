import React, { forwardRef } from 'react'

const cardTypes = {
  circle: "rounded-full aspect-square",
  rectangle: "rounded-xl",
  square: "rounded-xl aspect-square",
  rounded: "rounded-2xl",
  sharp: "rounded-none",
};


const cardSizes = {
  sm: "p-4 text-sm  w-56 sm:w-60", 
  md: "p-5 text-base w-72 sm:w-80", 
  lg: "p-6 text-lg w-80 sm:w-96",
};


const FlexCard = forwardRef(
  ({ size = "md", type = "rectangle", className, children, ...props }, ref) => {
    const baseClass =
      "shadow-[0px_8px_32px_rgba(5,16,28,0.4),_0px_2px_8px_rgba(5,16,28,0.2),_inset_0px_1px_0px_rgba(255,255,255,0.1)] overflow-hidden p-4 sm:bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725]";
    const classess = [baseClass, className, cardTypes[type], cardSizes[size]]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classess} {...props}>
        {children}
      </div>
    );
  }
);

export default FlexCard