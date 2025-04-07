import React, { useState } from 'react'

const BurgerMenu = ({onOpen}) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div>
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

      {/* <div className="absolute">
        <nav
          className={`bg-black fixed text-white h-full top-0 right-0 overflow-hidden transition-[0.5] py-12 font-bold text-2xl px-14 flex flex-col justify-center w-[350px] items-center ${isClick ? "translate-x-0" : "translate-x-full"}`}
        >
          <ul className=" space-y-8">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Hosters</a>
            </li>
            <li>
              <a>Events</a>
            </li>
            <li className="pt-4">
              <a
                href="/auth"
                className="
              block w-full py-3 px-6 text-center 
              bg-white text-black 
              rounded-md 
              hover:bg-gray-200 
              transition-colors 
              font-semibold
            "
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div> */}
    </div>
  );
}

export default BurgerMenu