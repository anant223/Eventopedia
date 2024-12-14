import React from 'react'

const Button = ({name, handleClick, icon, ...props}) => {
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 inline-flex py-2 px-4 text-white items-center text-base rounded-2xl
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