import React, { useEffect, useState } from 'react';
import {AppButton, FlexCard} from '../common/index.js'
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isExpired } from '@/features/commanAction.js';


const EventCard = ({event, position, onHover}) => {
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleExpo = async (id) => {
    try {
      setIsNavigating(true)
      if (document.startViewTransition) {
        await document.startViewTransition(() => {
          navigate(`/main/event-detail/${id}`)
        }).finished
      } else {
        navigate(`/main/event-detail/${id}`)
      }
    } catch (error) {
      console.error('Navigation failed:', error)
      setIsNavigating(false)
    }
  }
  
  const status = isExpired(event?.endDateTime)
  const bgColor = status === "Expired" ? "bg-red-500" : status === "Live" ? "bg-green-500" : "bg-blue-500"
  
  return (
    <FlexCard
      style={{
        left: position.x,
        top: position.y,
        transform: position.transform || "translate(0, 0)",
      }}
      className="absolute z-50 text-text w-60"
      onMouseEnter={(e) => onHover(event, e)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-text font-semibold">{event.title}</h3>
        <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
      </div>
      
      <div className="space-y-3 text-sm text-gray-300">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>
            {new Date(event.startDateTime).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-purple-500" />
          <span>{event?.attendees} people interested</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="capitalize">{event?.location}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}
        >
          {status === "Live"
            ? "🔴 Live Now"
            : status === "Upcoming"
              ? "📅 Upcoming"
              : "⏰ Expired"}
        </span>
        <AppButton
          onClick={() => handleExpo(event?._id)}
          disabled={isNavigating}
          size="sm"
          className="bg-gray-700/25 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
        >
          Explore
        </AppButton>
      </div>
    </FlexCard>
  )
}

export default EventCard