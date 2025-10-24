import React, { forwardRef } from 'react'

const AppInput = forwardRef(({placeholder, type, label, Icon, className, error, id, name, showlable, ...props }, ref) => {
    const inputId = id || name
    const hasError = error?.[name]
    const baseInputClasses = `w-full border border-gray-500 rounded-md py-3 pl-10 pr-2 focus:outline-none focus:ring-2 focus:border-transparent bg-transparent ${hasError ? " border-red-500 text-red-400 placeholder-red-400 focus:ring-red-500" : "border-gray-500 text-gray-500 placeholder-gray-500 focus:ring-gray-500 "}`
    const classes = [
        baseInputClasses,
        className
    ].filter(Boolean).join(" ")
  return (
    <div>
      {label && <label
        htmlFor={inputId}
        className={
          showlable ? "block text-sm font-medium text-text" : "sr-only"
        }
      >
        {label}
      </label>}
      <div className="relative">
        {Icon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none flex-shrink-0">
          <Icon
            className={`h-5 w-5 ${hasError?.[name] ? "text-red-500" : "text-gray-500"}`}
          />
        </div>}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder= {placeholder}
          className={classes}
          {...props}
        />
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {hasError.message}
        </p>
      )}
    </div>
  );
}
)
export default AppInput;