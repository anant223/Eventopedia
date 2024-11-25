import React, { useState } from 'react'
import {Container, Logo, BurgerMenu, Button} from "../index.js"


const Header = () => {
  const [isOpen, setIsOpen] = useState()
  return (
    <header>
      <nav className="bg-white shadow-md fixed w-full z-10 font-roboto">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div className="text-xl font-bold">
            <Logo/>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-gray-600 hover:text-blue-500">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-500"
            >
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-500">
              Pricing
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-500">
              Contact
            </a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Join
            </button>
          </div>

          <div
            className="md:hidden text-gray-600 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <a
              href="#features"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
            >
              Contact
            </a>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Join
            </button>
          </div>
        )}
      </nav>
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