import React from "react";
import { Container } from "../index.js";
import {
  Users,
  UserRoundPen,
  CirclePlus,
  CalendarDays,
  CircleGauge,
} from "lucide-react";

const Sidebarnav = () => {
  return (
    <nav className="max-w-[260px] h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-6 fixed top-[54.9px] font-roboto shadow-lg">
      <Container>
        <div className="h-full flex flex-col justify-between">
          <div>
            <ul className="text-base font-medium">
              <li className="flex items-center hover:bg-gray-700 hover:text-gray-100 py-3 px-6 rounded transition-all duration-300 group">
                <div className="w-1 h-6 bg-transparent group-hover:bg-gray-500 rounded-full mr-3"></div>
                <CircleGauge
                  size={20}
                  className="mr-3 text-gray-400 group-hover:text-gray-100"
                />
                <a>Dashboard</a>
              </li>
              <li className="flex items-center hover:bg-gray-700 hover:text-gray-100 py-3 px-6 rounded transition-all duration-300 group">
                <div className="w-1 h-6 bg-transparent group-hover:bg-gray-500 rounded-full mr-3"></div>
                <CalendarDays
                  size={20}
                  className="mr-3 text-gray-400 group-hover:text-gray-100"
                />
                <a>Events</a>
              </li>
              <li className="flex items-center hover:bg-gray-700 hover:text-gray-100 py-3 px-6 rounded transition-all duration-300 group">
                <div className="w-1 h-6 bg-transparent group-hover:bg-gray-500 rounded-full mr-3"></div>
                <Users
                  size={20}
                  className="mr-3 text-gray-400 group-hover:text-gray-100"
                />
                <a>Hosters</a>
              </li>
              <li className="flex items-center hover:bg-gray-700 hover:text-gray-100 py-3 px-6 rounded transition-all duration-300 group">
                <div className="w-1 h-6 bg-transparent group-hover:bg-gray-500 rounded-full mr-3"></div>
                <UserRoundPen
                  size={20}
                  className="mr-3 text-gray-400 group-hover:text-gray-100"
                />
                <a>Profile</a>
              </li>
            </ul>
          </div>

          <div className="px-6 border-t border-gray-700 pt-40">
            <button className="flex items-center justify-center w-full text-white font-extralight py-3 px-3.5  rounded shadow-md hover:shadow-lg transition-all duration-300 mt-20 text-sm ">
              <CirclePlus size={18} className="mr-2" />
              Create New Event
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Sidebarnav;
