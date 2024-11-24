import React from 'react'
import {Container, Logo, BurgerMenu, Button} from "../index.js"

const Header = () => {
  return (
    <header
      className="text-white sticky
     z-50 bg-gray-950 top-0"
    >
      <div className="max-w-7xl mx-auto sm:px-6">
        <div className=" backdrop-blur-md bg-gray-900 rounded-b-md h-full shadow-lg sm:mx-4">
          <div className="h-14 flex items-center justify-between px-2 sm:px-6">
          <div className='sm:hidden relative -top-4'>
            <BurgerMenu/>
          </div>
            <div>
              <Logo />
            </div>
            <nav className="hidden sm:flex mx-auto relative left-0 w-1/3">
              <ul className="flex space-x-8 text-base font-semibold">
                <li>
                  <a>Features</a>
                </li>
                <li>
                  <a>How it work</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </nav>
            <div >
              <Button name="Join" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header