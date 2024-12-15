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
    <aside className=" h-full bg-gray-800 border-r-[0.1px] border-gray-700 text-white top-20 z-30 fixed font-roboto w-[260px]">
      <div className=" flex flex-col h-[calc(100%-80px)] justify-between">
        <nav className="flex flex-col flex-none pl-12">
          <ul className="space-y-2 py-4">
            {sidebarMenuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handelmenuItemsClick(item.href)}
                  className={`flex items-center gap-3 px-4 py-2 text-gray-100 hover:bg-gray-500 transition-colors w-full rounded-e ${activeRoute === item.href ? "bg-gray-500" : " bg-transparent"}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
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
