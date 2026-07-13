import React, { forwardRef } from 'react'

const buttonVariants = {
  discord:
    "bg-[#5865F2] hover:bg-[#4752C4] text-text disabled:cursor-not-allowed",
  google:
    "bg-white hover:bg-gray-200 text-gray-900 disabled:cursor-not-allowed",
  ghost: "bg-transparent text-current hover:bg-gray-100/10",
  manual:
    "disabled:pointer-events-none bg-primary hover:bg-primary/90  border-0 text-sm font-medium text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  like: "",
  subscribe: "",
  share: "",
  delete:
    "inline-flex items-center bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm rounded-md hover:-translate-1 hover:scale-110 hover:duration-300",
  create:
    "flex items-center gap-2 rounded-lg text-primary-foreground border border-border",
  notification:
    "p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all",
  profile: "flex items-center gap-2 p-1 pr-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-border transition-all"
};

const buttonSizes = {
  none: "",
  sm: "py-2 px-3 text-sm",
  md: "h-10  px-4 py-2 font-medium",
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