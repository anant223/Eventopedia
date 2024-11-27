import React, { useEffect, useRef, useState } from 'react'
import {Container, Logo, BurgerMenu, Button} from "../index.js"
import { CloudSnow } from 'lucide-react';


const Header = () => {
  const [scrollDirPos, setScrollDirPos] = useState("0");
  const [countScroll, setCountScroll] = useState(0)
  const lastScroll = useRef()
  useEffect((()=>{
  
   const handleScroll = ()=>{
    console.log( window);
    const currentScroll = window.scrollY;
    setCountScroll(currentScroll)
    console.log(countScroll);
    if (currentScroll > lastScroll.current) {
      setScrollDirPos("-160px");
    } else if (currentScroll < lastScroll.current) {
      setScrollDirPos("0");
    }
     lastScroll.current = currentScroll;
   }

   window.addEventListener("scroll", handleScroll)

   return () =>{
    window.removeEventListener("scroll", handleScroll)
   }

  }),[])
  return (
    <header
      style={{ top: scrollDirPos }}
      className={`w-full font-roboto text-[#FFFFFF] fixed z-20 transition-all duration-300 ease-in-out ${
        countScroll >= 10 ? "bg-black" : " bg-transparent"
      } `}
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


