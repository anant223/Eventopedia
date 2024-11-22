import React from 'react'

const Button = ({name, icon}) => {
  return (
    <div>
      <button
        size="lg"
        className="bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 hover:from-yellow-500 hover:to-pink-600 text-lg px-8 py-3 rounded-full inline-flex items-end"
      >
        <span>{name}</span>
        <span>{icon}</span>
      </button>
    </div>
  );
}

export default Button