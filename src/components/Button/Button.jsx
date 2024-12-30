import React from 'react'

const Button = ({name, handleClick, icon, ...props}) => {
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-gradient-to-r  from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 inline-flex lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200  focus:bg-yellow-300 font-semibold text-white bg-black rounded-full gap-x-1
        "
        type="button"
        {...props}
      >
        <span>{name}</span>
        {icon && <span>{icon}</span>}
      </button>
    </div>
  );
}

export default Button