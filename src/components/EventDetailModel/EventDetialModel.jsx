import React from 'react'
import { useSelector } from 'react-redux'
import { selectEvent } from '../../features/AllVirtualEvents/virtualEventsSelector'
import { X, Image, CalendarDays, Clock, MapPin, Users,} from 'lucide-react'

const EventDetialModel = () => {
    const eventDetial = useSelector(selectEvent)
    console.log(eventDetial);
    const event = {
    id: "1",
    title: "Tech Conference 2023",
    date: "September 15-17, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    description:
      "Join us for the biggest tech conference of the year! Featuring keynote speakers, workshops, and networking opportunities. Our event brings together industry leaders, innovators, and tech enthusiasts for three days of learning, collaboration, and inspiration.",
    image: "/placeholder.svg?height=400&width=800",
    attendees: 5000,
    category: "Technology",
    isLive: true,
  }
  
  return (
    <div className=" relative inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 shadow-2xl">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={800}
            height={400}
            className="w-full h-48 sm:h-64 object-cover"
          />
          <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{event.title}</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-green-600 mb-2 sm:mb-0">
              {event.isLive && (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Live Now</span>
                </>
              )}
            </div>
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {event.category}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 text-gray-600">
              <CalendarDays className="h-5 w-5 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="h-5 w-5 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Users className="h-5 w-5 flex-shrink-0" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 sm:p-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
            {event.isLive ? "Join Meeting" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetialModel