import React, { useEffect, useRef, useState } from 'react'
import {Container, Logo, BurgerMenu, Button} from "../index.js"


const Header = () => {
  const [scrollDirPos, setScrollDirPos] = useState("0");
  const lastScroll = useRef()
  // useEffect((()=>{
  
  //  const handleScroll = ()=>{
  //   const currentScroll = window.pageXOffset;
  //   if (currentScroll > lastScroll.current.style.top) {
  //     lastScroll.current.style.top = "-50px"
      
  //   } else {
  //     lastScroll.current.style.top = "0";

  //   }
  //    lastScroll.current = currentScroll;
  //  }

  //  window.addEventListener("scroll", handleScroll)

  //  return () =>{
  //   window.removeEventListener("scroll", handleScroll)
  //  }

  // }),[])
  return (
    <header
      className={`w-full font-roboto text-[#FFFFFF] fixed z-20 transition-all duration-300`}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between  py-8">
          <div className="font-bold">
            <Logo />
          </div>
          <div className="hidden md:flex lg:flex sm:flex space-x-6 relative top-1 items-center text-base ">
            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <a>Features</a>
                </li>
                <li>
                  <a>How it work</a>
                </li>
                <li>
                  <a>Pricing</a>
                </li>
              </ul>
            </nav>
            <div>
              <button className=" font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 px-4 py-2 rounded-2xl ">
                Join
              </button>
            </div>
          </div>
          <div className=" relative top-1 lg:hidden md:hidden sm:hidden flex">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


{/* <header className="w-full sticky top-0 min-h-[50px] ">
        <nav className="flex justify-between items-center bg-indigo-800 py-4 sm:px-8 px-2 shadow-2xl  rounded-b-[5px] text-[#FFFFFF]">
          <div className="relative sm:hidden">
            <BurgerMenu />
          </div>
          <div className="text-2xl font-bold text-yellow-500 w-full sm:w-auto">
            <Logo />
          </div>
          <ul className="hidden md:flex space-x-6 text-[16px] font-bold justify-center relative pr-32">
            <li>
              <a href="#how-it-works" className="hover:text-yellow-500">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-yellow-500">
                How it work
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-yellow-500">
                Pricing
              </a>
            </li>
            <li>
              <a href="#templates" className="hover:text-yellow-500">
                Contact
              </a>
            </li>
          </ul>

          <button className="bg-[#FF5722] text-white py-2 px-4 rounded-lg hover:bg-red-400 shadow-sm">
            Join
          </button>
        </nav>
    </header> */}