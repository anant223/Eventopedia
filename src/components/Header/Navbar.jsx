import React, { useState } from "react";
import { Logo } from "../index.js";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="w-full font-roboto fixed text-white z-20 h-16 lg:h-20 bg-gray-800 flex items-center border-b border-gray-700">
      <div className="w-full flex justify-between items-center px-4 md:px-8 lg:px-16">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4 items-center">
          <button className="border px-3 py-2 rounded hover:bg-gray-700 transition">
            Upgrade
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              className=" px-3 py-2 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              My Account
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg z-30"
                role="menu"
                aria-label="Account Options"
              >
                <ul className="space-y-2 py-4 px-6">
                  <li className="hover:bg-gray-700 rounded px-2 py-1">
                    <a href="#" className="block" role="menuitem">
                      Profile
                    </a>
                  </li>
                  <li className="hover:bg-gray-700 rounded px-2 py-1">
                    <a href="#" className="block" role="menuitem">
                      History
                    </a>
                  </li>
                  <li className="hover:bg-gray-700 rounded px-2 py-1">
                    <a href="#" className="block" role="menuitem">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
