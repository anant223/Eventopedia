import React, { useState } from "react";
import {PlusCircleIcon} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {sidebarMenuItems} from "../../utils/constant.js"

const EventSidebar = ({isOpen}) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const navigate = useNavigate();

  const handelmenuItemsClick = (path) => {
    setActiveRoute(path);
    navigate(path);
  };

  return (
    <div
      className={`h-[calc(100%-56px)] hidden sm:block fixed w-[20%] bg-background border-r border-gray-800 z-30 bottom-0 transition-transform duration-300 ease-in-out  ${!isOpen ? "translate-x-0" : "-translate-x-[105%]"}`}
    >
      <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <ul className="space-y-2 pt-12 pl-12 pr-4 w-full">
          {sidebarMenuItems.map((item) => (
            <li key={item.label} className="">
              <button
                onClick={() => handelmenuItemsClick(item.href)}
                className={`flex 
                  p-2 text-text rounded-lg  w-full dark:text-white hover:bg-background dark:hover:bg-gray-700 group ${activeRoute === item.href ? "bg-gray-500" : " bg-transparent"} mx-auto`}
              >
                <span>
                  <item.icon className="w-5 h-5 text-text transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </span>
                <span className="ms-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
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
    </div>
  );
};

export default EventSidebar;
