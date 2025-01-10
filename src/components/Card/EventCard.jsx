import { Avatar, Tag, Timeline } from 'antd';
import { Calendar1Icon, User, Locate } from 'lucide-react'
import React from 'react'
import { RiThumbUpFill, RiUserLocationFill } from 'react-icons/ri';

const EventCard = ({imgSrc, eventName, place, noOfPeople, date}) => {
  return (
    <div className="rounded-xl border border-gray-700 shadow-lg bg-gray-700 h-full flex flex-col overflow-hidden text-gray-200 font-roboto text-lg/3">
      <div className="flex flex-col  space-y-1.5 p-0">
        <div className="relative">
          <img src={imgSrc} alt="event_img" />
          <span className=" absolute right-2 bg-black top-2 p-1 rounded bg-opacity-30 text-sm/3">
            {place}
          </span>
        </div>
        <div className="p-4 flex-grow">
          <div className=" h-full flex flex-col">
            <h3 className="tracking-tight text-xl font-bold text-gray-200 mb-1 line-clamp-2 min-h-[3.5rem]">
              {eventName}
            </h3>
            <div className=" space-y-3 mb-4">
              <div className="flex items-center mb-2">
                <Calendar1Icon className="mr-2" size={18} />
                <span>{date}</span>
              </div>
              <div className="flex items-center mb-2">
                <Locate className="mr-2" size={18} />
                <span>{place}</span>
              </div>
              <div className="flex items-center mb-2">
                <User className="mr-2" size={18} />
                <span>Created By-</span>
                <span>Anant</span>
              </div>
            </div>
            <div className="mb-4">
              <Tag size="large">AI/ML</Tag>
              <Tag size="large">Bussinuess</Tag>
              <Tag size="large">Tech</Tag>
            </div>
          </div>
        </div>
        <div className="border-t-2 p-4 border-gray-600 flex items-center justify-between ">
          <div className=" text-lg/3 gap-2 flex items-center ">
            <span className=" text-gray-500">Duration:</span>
            <span>1 hr</span>
          </div>
          <div className="flex items-center text-lg/3">
            <span>
              <RiThumbUpFill />
            </span>
            {10}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;