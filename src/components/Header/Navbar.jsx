import React, { useState } from "react";
import { BurgerMenu, Logo } from "../index.js";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import {Button} from "antd"
import apiRequest from "../../api/apiRequest.js";
import { userService } from "../../api/auth.js";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const destroySession = async () => {
    try {
      const response = await userService.logoutSession();
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

  const handelProfile = () =>{
    navigate("/main/user-profile")
  }
  
  return (
    <nav className="w-full inset-0 font-roboto fixed text-white z-20 h-16 bg-gray-800 flex items-center border-b border-gray-700">
      <div className="w-full flex justify-between  items-center px-4 md:px-8 lg:px-12">
        <div>
          <Link to={"/main/all-events"}>
            <Logo />
          </Link>
        </div>
        <div className=" hidden lg:flex md:flex sm:flex gap-4 items-center">
          {/* <Button size="large">Upgrade</Button> */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              className=" border px-2 w-24 h-[2.3rem] py-[0.3rem] rounded"
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
                <button
                  onClick={handelProfile}
                  className=" hover:bg-gray-600 px-4 py-2 text-sm w-full flex"
                >
                  Profile
                </button>
                <button
                  onClick={destroySession}
                  className=" flex w-full px-4 py-2 hover:bg-gray-600 text-sm"
                >
                  Sign out
                </button>
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
