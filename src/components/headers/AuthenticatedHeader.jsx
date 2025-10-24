import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../index";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/selector/authSelector";
import userService from "@/api/userService";
import { motion } from "framer-motion";
import { quickActions } from "../../utils/constant";
import { AppButton, HamburgerButton } from "../common/index";
import { ChevronDown, LogOut, Plus, Settings, User } from "lucide-react";

const AuthenticatedHeader = () => {
  const user = useSelector(selectUser);
  const [isOpend, setIsOpened] = useState(false)
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const userData = user?.data?.data;
  // console.log(userData);
  const username = userData?.name;
  const useremail = userData?.email;
  const useravtar = userData?.avatar;

  const handleEndSession = async () => {
    try {
      const session = await userService.logoutUser();
      if (session) {
        navigate("/");
      }
    } catch (error) {
      throw new Error("Something went wrong while ending session", error);
    }
  };

  const handleHamburgerButton = () => {
    setIsOpened(!isOpend)
  }
  const handleCreate = () => {
    navigate("/main/create-event")
  }

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  <motion.button
    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden space-x-3 p-1  hover:bg-gray-100 transition-colors duration-200"
    
  >
    <img src={useravtar} alt="my-avtar" className="w-12 h-12" />
  </motion.button>;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl w-full shadow-xl h-16">
      <div className="max-w-7xl container col- mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link
            to="/main/all-events"
            className="flex items-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent rounded-md"
            aria-label="Go to all events"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-4 justify-center">
            <AppButton onClick={handleCreate} size="sm" buttonStyle="manual" className="rounded-2xl font-roboto">
              <Plus className="w-5 h-5" />
              <span>Create</span>
            </AppButton>
            <div className="relative">
              <motion.button
                animate={{
                  boxShadow: isExpanded
                    ? "0 0 30px rgba(59,130,246,0.6), 0 0 60px rgba(147,51,234,0.4)"
                    : "0 0 15px rgba(59,130,246,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-3 p-1 rounded-full"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden transition-all duration-300">
                  <img
                    src={useravtar}
                    alt="user-img"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
                </motion.div>
              </motion.button>
              {isExpanded && (
                <motion.div
                  className="absolute top-16 right-0 w-64 backdrop-blur-xl bg-gray-900/95 border border-gray-700/50 rounded-2xl p-4 shadow-2xl z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <img src={useravtar} alt="my-avtar" />
                    </div>
                    <h3 className="text-white font-semibold capitalize">
                      {username}
                    </h3>
                    <p className="text-gray-400 text-sm">Product Manager</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {quickActions.map((action, i) => (
                      <motion.button
                        key={action.label}
                        onClick={() => navigate("/main/user-profile")}
                        className={`p-3 bg-gradient-to-br ${action.color} rounded-xl flex flex-col items-center space-y-1`}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <action.icon className="w-4 h-4 text-white" />
                        <span className="text-white text-xs">
                          {action.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-gray-700/50 pt-3">
                    <AppButton
                      size="sm"
                      className="w-full border-gray-600 text-text bg-transparent"
                      onClick={handleEndSession}
                    >
                      Sign Out
                    </AppButton>
                  </div>
                </motion.div>
              )}
            </div>
            <div className=" relative block md:hidden">
              <HamburgerButton
                status={isOpend}
                handleClick={handleHamburgerButton}
              />
              <div
                className={`fixed top-0 right-0 h-screen w-1/2 z-40 bg-[#0a1628]/95 p-8 shadow-xl transition-transform duration-300 transform ${isOpend ? "translate-x-0" : "translate-x-full"}`}
              >
                <div className="flex flex-col items-center h-full justify-center">
                  <button
                    onClick={handleCreate}
                    className="text-gray-900 font-medium flex gap-2 capitalize font-roboto p-4 justify-center w-32 h-10 items-center rounded-full bg-white hover:bg-gray-500 hover:text-white"
                  >
                    <span>
                      <Plus />
                    </span>
                    create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
