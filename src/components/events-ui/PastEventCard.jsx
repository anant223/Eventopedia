import { ChevronRight, Clock, MapPin } from 'lucide-react';
import React from 'react'

const PastEventCard = ({event}) => {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl p-5 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-80">
      <div className="relative">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-semibold opacity-70">
                  {event.day}
                </div>
                <div className="text-lg font-bold">{event.date}</div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-base font-medium text-gray-300 mb-1">
              {event.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-2">
              {event.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-gray-800/50 rounded-full text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 text-2xl opacity-50">{event.logo}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{event.location}</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-1 text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors py-2 border border-gray-800 rounded-lg hover:border-gray-700">
          <span>View Recording</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default PastEventCard