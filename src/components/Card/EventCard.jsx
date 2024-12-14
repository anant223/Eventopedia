import { Calendar1Icon, LocateIcon, Users, LocateOffIcon } from 'lucide-react'
import React from 'react'

const EventCard = ({ imgSrc, eventName, date, place, noOfPeople }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden font-roboto">
      <img src={imgSrc} alt="card-img" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">{eventName}</h2>
        <div className="">
          <div className="flex items-center mb-2">
            <Calendar1Icon className="mr-2" size={18} />
            <span>{date}</span>
          </div>
          <div className="flex items-center mb-2">
            <LocateIcon className="mr-2" size={18} />
            <span>{place}</span>
          </div>
          <div className="flex items-center mb-2">
            <Users className="mr-2" size={18} />
            <span>{noOfPeople} attendees</span>
          </div>
        </div>
        <button
          type="button"
          className=" bg-indigo-600 text-white w-full mb-4  py-2 px-4 rounded-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard