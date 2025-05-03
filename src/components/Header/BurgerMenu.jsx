import React, { useState } from 'react'

const BurgerMenu = ({onOpen}) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      className={`w-[38px] h-6 cursor-pointer flex flex-col justify-center items-center relative z-10`}
      onClick={() => setIsClick(!isClick)}
    >
      <div
        className={`w-full h-1 bg-slate-200 rounded-md absolute transform transition-transform duration-300 ease-in-out ${
          isClick ? "rotate-45" : "translate-y-[-8px]"
        }`}
      ></div>
      <div
        className={`w-full h-1 bg-slate-200 rounded-md transform transition-opacity duration-150 ease-in-out ${
          isClick ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`w-full h-1 bg-slate-200 rounded-md absolute transform transition-transform duration-300 ease-in-out ${
          isClick ? "-rotate-45" : "translate-y-[8px]"
        }`}
      ></div>
    </div>
  );
}

export default BurgerMenu