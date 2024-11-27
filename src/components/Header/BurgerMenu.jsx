import React, { useState } from 'react'

const BurgerMenu = () => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div>
      <div
        className={`w-16 h-8 cursor-pointer flex flex-col justify-between items-center relative z-10`}
        onClick={() => setIsClick(!isClick)}
      >
        <div
          className={`w-full h-2 bg-slate-200 rounded-md transform transition-transform duration-300 ease-in-out ${
            isClick && "rotate-45 translate-y-2 top-4" 
          }`}
        ></div>
        <div
          className={`w-full h-2 bg-slate-200 rounded-md transform transition-opacity duration-150 ease-in-out ${
            isClick ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-full h-2 bg-slate-200 rounded-md transform transition-transform duration-300 ease-in-out ${
            isClick && "-rotate-45 -translate-y-2 relative bottom-4" 
          }`}
        ></div>
      </div>

    {isClick? <div className="absolute"> <nav className=" bg-black fixed text-white text-justify h-full top-0 right-0 overflow-hidden transition-[0.5] py-12 font-bold text-2xl px-14 flex flex-col justify-center w-[450px]">
        <ul className=" space-y-8">
          <li>
            <a>Features</a>
          </li>
          <li>
            <a>How it work</a>
          </li>
          <li>
            <a>Pricing</a>
          </li>
          <li>
            <a>Connect</a>
          </li>
        </ul>
      </nav>
       <div>
        <button className="w-full flex items-center justify-center">
          Join
        </button>
      </div> </div> : ""} 
    </div>
  );
}

export default BurgerMenu