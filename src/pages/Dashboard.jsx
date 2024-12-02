import React from 'react'
import { DashboardCard, RecentEvent, EventSidebar } from '../components/index.js';
import { CalendarIcon, Home, User} from "lucide-react"

const Dashboard = () => {
  return (
    <div className="w-full  relative flex justify-center bg-gray-800  min-h-screen">
      <div className="w-full grid grid-cols-[20%_70%]">
        <div className=" relative ">
          <EventSidebar />
        </div>
        <div className="flex flex-col space-y-12 px-14">
          <div className=" relative flex w-full pt-20 gap-8 ">
            <DashboardCard
              title="Upcoming Events"
              value="5"
              Icon={CalendarIcon}
              color="bg-blue-500"
            />
            <DashboardCard
              title="Total Attendees"
              value="128"
              Icon={User}
              color="bg-green-500"
            />
            <DashboardCard
              title="New Messages"
              value="12"
              Icon={Home}
              color="bg-pink-500"
            />
          </div>
          <div className="">

            <RecentEvent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard