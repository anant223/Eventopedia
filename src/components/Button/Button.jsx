import React from 'react'

const Button = ({name, icon}) => {
  return (
    <div>
      <button
        className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-xl sm:px-2 sm:py-2 px-2 lg:px-4 md:px-4 rounded-full inline-flex items-end py-1 text-white
        "
      >
        <span>{name}</span>
        <span>{icon}</span>
      </button>
    </div>
  );
}

export default Button