import React, { useState } from "react";
import { BurgerMenu, Logo } from "../index.js";
import axios from "axios";
import { Link } from "react-router-dom";
import {Button} from "antd"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logOutSession = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response) {
        alert("You have logged out successfully");
      }
    } catch (error) {
      console.error("Logout Error:", error.response || error.message);
      alert(
        error.response?.data?.message || "Failed to log out. Please try again."
      );
    }
  };

  return (
    <nav className="w-full inset-0 font-roboto fixed text-white z-20 h-16 bg-gray-800 flex items-center border-b border-gray-700">
        <div className="w-full flex justify-between items-center px-4 md:px-8 lg:px-16">
          <div className="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5">
              <Logo />
            </Link>
          </div>
          <div className=" hidden lg:flex md:flex sm:flex gap-4 items-center">
            <Button size="large">Upgrade</Button>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                className=" lg:text-lg px-3 py-2 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-sm"
              >
                My Account
              </button>
              {isDropdownOpen && (
                <div
                  class="absolute bg-gray-700 right-0 z-10 mt-2 w-48 origin-top-right rounded-md text-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <Link
                    href="#"
                    className="block hover:bg-gray-600 px-4 py-2 text-sm "
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0 hover:bg-gray-600"
                  >
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-600 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className=" lg:hidden md:hidden sm:hidden flex">
            <BurgerMenu />
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
