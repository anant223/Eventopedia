// 4. PropertyDetailsCard.jsx
// Bottom card that shows event/property details (like in your image)

import { Calendar, Eye, Thermometer, MapPin, Heart } from "lucide-react";

export default function PopularEventsCard({ event }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-2xl p-6">
      <div className="flex gap-6">
        {/* Left Section - Location Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Location</h3>
              <p className="text-sm text-gray-600">{event?.location.address}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-yellow-500" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              icon={<Calendar className="w-5 h-5 text-gray-400" />}
              label="Date"
              value={new Date(event.startDateTime).toLocaleDateString()}
            />
            <StatCard
              icon={<Eye className="w-5 h-5 text-gray-400" />}
              label="Attendees"
              value={event.attendees?.toLocaleString() || "0"}
            />
            <StatCard
              icon={<Thermometer className="w-5 h-5 text-gray-400" />}
              label="Category"
              value={event.category}
            />
          </div>
        </div>

        {/* Middle Section - Event Image */}
        <div className="w-64 h-40 rounded-xl overflow-hidden shadow-lg">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Participants/Tenants */}
        <div className="w-48">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Attendees</h3>
          <p className="text-sm text-gray-600 mb-4">
            Join our growing community of active members
          </p>

          {/* Avatar Group */}
          <div className="flex -space-x-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"
              >
                <img
                  src={`/avatar-${i}.png`}
                  alt={`Attendee ${i}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Member Count Circle */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#FCD34D"
                strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset="94"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">
                {event.attendees
                  ? `${(event.attendees / 1000).toFixed(1)}k`
                  : "0"}
              </span>
              <span className="text-xs text-gray-500">members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
      <div className="mb-2">{icon}</div>
      <span className="text-xs text-gray-500 mb-1">{label}</span>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  );
}
