import React from "react";
import {
  HomeIcon,
  Users,
  CalendarIcon,
  UserIcon,
  PlusCircleIcon,
} from "lucide-react";

const menuItems = [
  { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Hosters", href: "/hosters" },
  { icon: CalendarIcon, label: "Events", href: "/events" },
  { icon: UserIcon, label: "Profile", href: "/profile" },
];


const EventSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 border-r border-gray-200 text-white top-[56px] z-30 fixed">
      <div className=" h-[90%] flex flex-col">
        <div className="p-6"></div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-100 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <PlusCircleIcon className="h-5 w-5" />
            <span>Create New Event</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default EventSidebar;
