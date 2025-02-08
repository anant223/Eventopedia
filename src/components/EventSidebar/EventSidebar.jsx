import React, { useState } from "react";
import {PlusCircleIcon} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {sidebarMenuItems} from "../../utils/constant.js"
import Logo from "../Logo.jsx";

const EventSidebar = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const navigate = useNavigate();

  const handelmenuItemsClick = (path) => {
    setActiveRoute(path);
    navigate(path);
    console.log(path);
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 shadow-lg flex flex-col bg-gray-800">
      <nav className=" flex-1 py-4 mt-24 px-4 md:px-8 lg:px-12">
        <ul className="space-y-2">
          {sidebarMenuItems.map((item) => (
            <li key={item.label} className="">
              <button
                onClick={() => handelmenuItemsClick(item.href)}
                className={`flex 
                  p-2 text-gray-900 rounded-lg  w-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeRoute === item.href ? "bg-gray-500" : " bg-transparent"} mx-auto`}
              >
                <span>
                  <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </span>
                <span className="ms-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t border-gray-700">
        <button
          onClick={() => navigate("/main/create-event")}
          className="w-full text-sm flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors rounded p-2 mt-1"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>New Event</span>
        </button>
      </div>
    </div>
  );
};

export default EventSidebar;
