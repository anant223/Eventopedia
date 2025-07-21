import React, { forwardRef } from 'react'

const buttonVariants = {
  discord: "bg-[#5865F2] hover:bg-[#4752C4] text-text",
  google: "bg-white hover:bg-gray-200 text-gray-900",
  manual: "w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors",
  ghost: "bg-transparent text-current hover:bg-gray-100/10",
};

const buttonSizes = {
  sm: "py-2 px-3 text-sm",
  md: "py-3 px-4",
  lg: "py-4 px-6 text-lg",
};

const Button = forwardRef(({children, buttonStyle, size="md", className, isDisable = false, isLoading = false, type="button", ...props}, ref) => {
  const baseClasses = "flex items-center justify-center gap-3 w-full font-medium rounded disabled:cursor-not-allowed disabled:opacity-50"
  
  const classess = [
    baseClasses,
    buttonVariants[buttonStyle],
    buttonSizes[size],
    className
  ].filter(Boolean).join(" ")

  return (
    <button ref={ref} className={classess} disabled={isDisable || isLoading} type={type} {...props}>
        {children}
    </button>
  )
})

export default Button