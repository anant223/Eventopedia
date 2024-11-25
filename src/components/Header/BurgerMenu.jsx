import React from 'react'

const BurgerMenu = () => {
  return (
    <div className="relative">
      <button
        className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 group p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Menu"
      >
        <div
          className={`w-6 h-1 bg-white rounded-full transition-all duration-300 ease-in-out `}
        />
        <div
          className={`w-6 h-1 bg-white rounded-full transition-all duration-300`}
        />
        <div
          className={`w-6 h-1 bg-white rounded-full transition-all duration-300 ease-in-out `}
        />
      </button>
    </div>
  );
}

export default BurgerMenu