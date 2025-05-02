import React from 'react'
import {  MapPinIcon,} from 'lucide-react';
import {Like, Share, Subscribe} from "../index.js"

const EventCard = ({imgSrc, time, eventName, place, noOfHour, date, tag, openIt, id}) => {
  // const tags = tag.split(",")

  return (
    <div
      className="w-full h-[220px] bg-[#0c1725] rounded-[16px] overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 capitalize text-text group"
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex flex-col justify-between h-full p-4 ">
        <div>
          <div className="flex items-center space-x-2 text-sm font-medium mb-3">
            <span className="bg-secondary/80 backdrop-blur-sm py-1 px-3 rounded-full shadow-sm">
              {date}
            </span>
            <span className="bg-secondary/80 backdrop-blur-sm py-1 px-3 rounded-full shadow-sm">
              {time}
            </span>
          </div>
          <div className="flex-grow flex flex-col py-1">
            <h2 className="text-2xl font-bold line-clamp-1 text-white drop-shadow-md">
              {eventName}
            </h2>
          </div>
          <div className="flex items-center gap-2 font-medium text-gray-200 mt-3">
            <div className="flex items-center bg-black/30 backdrop-blur-sm py-1 px-2 rounded-lg">
              <MapPinIcon size={16} className="mr-1" />
              <span>Online/Offline</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3">
          <Subscribe eventId={id}/>
          <div className="flex items-center gap-3">
            <Like eventId={id}/>
            <Share
              eventId={id}
              imgSrc={imgSrc}
              eventName={eventName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;