import React, { forwardRef } from 'react'

const colorVariants = {
  primary:
    "bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-primary hover:bg-primary/90 rounded-full",
};

const buttonSize = {
  sm: "",
  md: "h-10  px-6 py-2 text-sm font-medium",
  lg: "",
};

const MainButton = forwardRef(({ children, variant= "primary", type="button", size="md", className, ...props}, ref) => {
  const baseClasses = "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justify-center border-0 text-text"

  const classes = [
    baseClasses,
    className,
    buttonSize[size],
    colorVariants[variant]
  ].filter(Boolean).join(" ")
  return (
    <div>
      <button
        ref={ref}
        className={classes}
        type={type}
        {...props}
      >
        {children}
      </button>
    </div>
  );
})

export default MainButton;
