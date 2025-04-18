import React from "react";
import { X, CalendarDays, Clock, MapPin } from "lucide-react";

const EventDetailModal = ({
  title,
  startingDate,
  location,
  thumbnail,
  isLive = true,
  tag,
  desc,
  closeIt,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Modal Header with Thumbnail */}
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            width={800}
            height={400}
            className="w-full h-48 sm:h-64 object-cover"
          />
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            onClick={closeIt}
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Live Status and Tag */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-green-600 mb-2 sm:mb-0">
              {isLive && (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Live Now</span>
                </>
              )}
            </div>
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {tag}
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 text-gray-600">
              <CalendarDays className="h-5 w-5 flex-shrink-0" />
              <span>
                {new Date(startingDate).toLocaleString([], {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="h-5 w-5 flex-shrink-0" />
              <span>
                {new Date(startingDate).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <span>{location || "Online"}</span>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
          </div>

          {/* Delete Button */}
          <div>
            <button className="bg-red-600 px-3 py-1 rounded-lg text-white hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
            {isLive ? "Join Meeting" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
