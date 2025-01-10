import React, { useState } from "react";
import {PlusCircleIcon} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {sidebarMenuItems} from "../../utils/constant.js"

const EventSidebar = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const navigate = useNavigate();

  const handelmenuItemsClick = (path) => {
    setActiveRoute(path);
    navigate(path);
  };

  return (
    <aside className=" h-full bg-gray-800 border-r-[0.1px] border-gray-700 text-white top-16 z-30 fixed inset-0 font-roboto max-w-64 left-0 transition-transform -translate-x-full sm:translate-x-0">
      <div className=" flex flex-col h-[calc(100%-80px)] justify-between py-2 mt-6">
        <nav className="pl-12">
          <ul className="space-y-2 py-4">
            {sidebarMenuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handelmenuItemsClick(item.href)}
                  className={`flex items-center p-2 text-gray-900 rounded-lg  w-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeRoute === item.href ? "bg-gray-500" : " bg-transparent"}`}
                >
                  <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
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
    </aside>
  );
};

export default EventSidebar;
