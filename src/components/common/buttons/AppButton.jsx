import React, { forwardRef } from 'react'

const buttonVariants = {
  discord:
    "bg-[#5865F2] hover:bg-[#4752C4] text-text disabled:cursor-not-allowed",
  google:
    "bg-white hover:bg-gray-200 text-gray-900 disabled:cursor-not-allowed",
  ghost: "bg-transparent text-current hover:bg-gray-100/10",
  manual: "disabled:pointer-events-none bg-primary hover:bg-primary/90  border-0 text-sm font-medium text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  like: "",
  subscribe: "",
  share: ""
};

const buttonSizes = {
  sm: "py-2 px-3 text-sm",
  md: "h-10  px-6 py-2 font-medium",
  lg: "py-4 px-6 text-lg",
};

const AppButton = forwardRef(({children, buttonStyle, size="md", className, isDisable = false, isLoading = false, type="button", ...props}, ref) => {
  const baseClasses =
    "inline-flex items-center capitalize justify-center gap-2 rounded  disabled:opacity-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  


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

export default AppButton