import React from 'react'
import { Link } from 'react-router-dom';

const EventMapCard = ({ event, onClose }) => {
  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden relative">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full px-2 py-1 text-sm"
      >
        ✕
      </button>

      {/* Image */}
      <div className="h-40 w-full">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">
          ₹{event.price}
          <span className="text-sm font-normal text-gray-500"> / ticket</span>
        </h3>

        <p className="text-sm text-gray-700 mt-1">{event.title}</p>

        <p className="text-xs text-gray-500 mt-1">
          {event.location.city}, {event.location.country}
        </p>
      </div>
    </div>
  );
};

export default EventMapCard