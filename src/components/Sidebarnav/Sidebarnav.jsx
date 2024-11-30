import React from 'react'
import {Container} from "../index.js"
import {Users, UserRoundPen, CirclePlus, CalendarDays, CircleGauge} from "lucide-react"

const Sidebarnav = () => {
  return (
    <nav className=" w-[218px] border-[1px] h-screen text-white py-12 fixed top-[54.9px] font-roboto">
      <Container>
        <div className=" h-full flex flex-col justify-between">
          <div className=" flex justify-between flex-col h-full mb-52">
            <ul className=" text-xl font-light mb-6">
              <li className=" flex items-center hover:bg-gray-700 py-2 px-4 rounded">
                <CircleGauge size={24} className="mr-2" /> <a> Dashbord</a>
              </li>
              <li className=" flex items-center hover:bg-gray-700 py-2 px-4 rounded">
                <CalendarDays size={24} className="mr-2" />
                <a>Events</a>
              </li>
              <li className=" flex items-center hover:bg-gray-700 py-2 px-4 rounded">
                <Users size={24} className="mr-2" /> <a>Hosters</a>
              </li>
              <li className=" flex items-center hover:bg-gray-700 py-2 px-4 rounded">
                <UserRoundPen size={24} className="mr-2" /> <a>Profile</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-end">
            <button className="flex items-center hover:bg-gray-700 py-2 px-4 rounded text-gray-500">
              <CirclePlus size={16} className="mr-1" />
              Create New Event
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Sidebarnav