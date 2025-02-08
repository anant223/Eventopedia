import { Avatar, Tag, Timeline } from 'antd';
import { Calendar1Icon, User, Locate } from 'lucide-react'
import React from 'react'
import { RiThumbUpFill, RiUserLocationFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const EventCard = ({imgSrc, eventName, place, noOfHour, date, tag, openIt}) => {
  const tags = tag.split(",")
  return (
    // <button onClick={openIt}>
    //   <div className=" bg-gray-700 lg:w-[23.5294117647rem] w-[340px] text-gray-200 min-h-[29.4117647059rem] rounded-3xl capitalize shadow-lg font-roboto flex flex-col text-lg/3">
    //     {/* <div className="rounded-xl capitalize border border-gray-700 shadow-lg bg-gray-700 h-full flex flex-col overflow-hidden text-gray-200 font-roboto text-lg/3"> */}
    //     <div className="flex flex-col  space-y-1.5 p-0">
    //       <div className="relative ">
    //         <img src={imgSrc} alt="event_img" />
    //         <span className=" absolute right-2 bg-black top-2 p-1 rounded bg-opacity-30 text-sm/3">
    //           {place}
    //         </span>
    //       </div>
    //       <div className="p-4 flex-grow">
    //         <div className=" h-full flex flex-col">
    //           <h3 className="tracking-tight text-xl font-bold text-gray-200 mb-2 line-clamp-2 min-h-[2.8rem]">
    //             {eventName}
    //           </h3>
    //           <div className=" space-y-3 mb-4">
    //             <div className="flex items-center mb-2">
    //               <Calendar1Icon className="mr-2" size={18} />
    //               <span>{date}</span>
    //             </div>
    //             <div className="flex items-center mb-2">
    //               <Locate className="mr-2" size={18} />
    //               <span>{place}</span>
    //             </div>
    //           </div>
    //           <div className="mb-2">
    //             {tags.map((tag, i) => (
    //               <Tag key={i} size="large">{tag}</Tag>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="border-t-2 p-4 border-gray-600 flex items-center justify-between ">
    //         <div className=" text-lg/3 gap-2 flex items-center ">
    //           <span className=" text-gray-500">Duration:</span>
    //           <span>{noOfHour} hr</span>
    //         </div>
    //         <div className="flex items-center text-lg/3">
    //           <span>
    //             <RiThumbUpFill />
    //           </span>
    //           {10}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </button>
    <div
      onClick={openIt}
      className="w-[32%] h-[32%] bg-white shadow-lg rounded-lg overflow-hidden"
    >
      {/* Event Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
        <h1 className="text-3xl font-bold text-white">Virtual Event</h1>
        <p className="text-white mt-2">
          Join us for an exciting online experience!
        </p>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{eventName}</h2>
        <p className="text-gray-600 mt-2">📅 Date: [Insert Date]</p>
        <p className="text-gray-600">⏰ Time: [Insert Time & Time Zone]</p>
        <p className="text-gray-600">📍 Platform: [Insert Platform]</p>

        {/* Highlights */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Event Highlights
          </h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Keynote Speaker</li>
            <li>Interactive Workshop</li>
            <li>Networking Opportunities</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <a
            href="#"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-gray-600">Share this event with your network!</p>
      </div>
    </div>
  );
};

export default EventCard;