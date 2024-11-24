import React from 'react'

const Button = ({name, icon}) => {
  return (
    <div>
      <button
        className="bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 hover:from-yellow-500 hover:to-pink-600 text-lg sm:px-8 sm:py-2 px-4 rounded-full inline-flex items-end py-1"
      >
        <span>{name}</span>
        <span>{icon}</span>
      </button>
    </div>
  );
}

export default Button