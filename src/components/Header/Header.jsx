import React from 'react'
import {Container, Logo} from "../index.js"

const Header = () => {
  return (
    <header className=" bg-yellow-950 py-4 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <nav className="flex justify-between w-full items-center">
          <div>
            <Logo />
          </div>
          <div>
            <ul className="flex w-full space-x-8 text-lg font-medium  transition-colors text-white items-center">
              <li className="hover:text-yellow-300">
                <a href="#">Features</a>
              </li>
              <li className="hover:text-yellow-300">
                <a href="#">How it Works</a>
              </li>
              <li className="hover:text-yellow-300">
                <a href="#">Contact</a>
              </li>
              <li className="hover:text-yellow-300">
                <a href="#">Login</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header