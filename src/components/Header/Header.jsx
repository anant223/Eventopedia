import React from 'react'
import {Container, Logo, BurgerMenu, Button} from "../index.js"


const Header = () => {
  return (
    <header className="w-full sticky top-0 ">
        <nav className="flex justify-between items-center bg-indigo-800 py-4 sm:px-8 px-2 shadow-2xl  rounded-b-[5px] text-[#FFFFFF]">
          <div className="relative sm:hidden">
            <BurgerMenu />
          </div>
          <div className="text-2xl font-bold text-yellow-500 w-full sm:w-auto">
            <Logo />
          </div>
          <ul className="hidden md:flex space-x-6 text-[16px] font-bold justify-center relative right-24">
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
    </header>
  );
};

export default Header;

