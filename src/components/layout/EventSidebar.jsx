import React, { useState } from "react";
import {Calendar, Home, MessageCircle, PlusCircle, PlusCircleIcon, TrendingUp, Users} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {sidebarMenuItems} from "../../utils/constant.js"
import { Logo } from "../index.js";

const EventSidebar = ({isOpen}) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const navigate = useNavigate();
   const [activeIcon, setActiveIcon] = useState("home");

   const sidebarIcons = [
     { id: "home", icon: Home, label: "Home" },
     { id: "add", icon: PlusCircle, label: "Add" },
     { id: "calendar", icon: Calendar, label: "Calendar" },
     { id: "trending", icon: TrendingUp, label: "Trending" },
     { id: "users", icon: Users, label: "Users" },
   ];

  const handelmenuItemsClick = (path) => {
    setActiveRoute(path);
    navigate(path);
  };

  return (
    <div className={`
        fixed md:relative
        w-20 bg-white shadow-lg 
        flex flex-col items-center py-6 space-y-8
        transition-transform duration-300 ease-in-out
        z-40 h-full
       
      `}
    >
      {/* Navigation Icons */}
      <div className="flex-1 flex flex-col items-center space-y-6">
        {sidebarIcons.map((item) => {
          const Icon = item.icon;
          const isActive = activeIcon === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveIcon(item.id)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              }`}
              aria-label={item.label}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>

      {/* Bottom Icon */}
      <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
        <MessageCircle size={24} className="text-white" />
      </div>
    </div>
  );
};

export default EventSidebar;
