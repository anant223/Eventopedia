import React from 'react';
import { Logo} from "../index.js"

const Navbar = () => {
  return (
    <nav className="w-full font-roboto fixed text-white z-20 h-16 bg-gray-800 flex items-center">
        <div className=" w-full flex justify-between items-center px-4 md:px-8 lg:px-16">
          <div>
            <Logo />
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <button className=" border px-3 py-2 rounded">Upgrade</button>
            </div>
            <div>
              <a
                href="#"
                className=" focus:outline-none focus:ring-2 focus::ring-gray-200"
              >
                My Account
              </a>
            </div>
          </div>
        </div>
    </nav>
  );
}

export default Navbar