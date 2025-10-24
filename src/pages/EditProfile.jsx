import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';

// Sample data
const sampleEvents = [
  { id: 1, title: "React Workshop", type: "workshop", date: "2025-08-15", attendees: 45, status: "upcoming" },
  { id: 2, title: "AI Webinar", type: "webinar", date: "2025-08-20", attendees: 120, status: "live" },
  { id: 3, title: "Design Sprint", type: "workshop", date: "2025-07-25", attendees: 30, status: "recorded" },
  { id: 4, title: "Tech Talk", type: "seminar", date: "2025-08-10", attendees: 80, status: "upcoming" },
  { id: 5, title: "UX Research", type: "workshop", date: "2025-08-12", attendees: 25, status: "upcoming" },
  { id: 6, title: "Marketing Summit", type: "conference", date: "2025-09-01", attendees: 200, status: "upcoming" },
  { id: 7, title: "Code Review", type: "seminar", date: "2025-07-30", attendees: 15, status: "recorded" },
  { id: 8, title: "Product Demo", type: "demo", date: "2025-08-18", attendees: 60, status: "upcoming" },
  { id: 9, title: "DevOps Workshop", type: "workshop", date: "2025-08-25", attendees: 35, status: "upcoming" },
  { id: 10, title: "Leadership Talk", type: "seminar", date: "2025-09-05", attendees: 90, status: "upcoming" },
];

const EventCard = ({ event, position }) => (
  <div 
    className="absolute bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-80 z-50 pointer-events-auto"
    style={{
      left: position.x,
      top: position.y,
      transform: position.transform || 'translate(0, 0)'
    }}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-gray-900 text-lg leading-tight">{event.title}</h3>
      <div className={`w-3 h-3 rounded-full ${
        event.status === 'live' ? 'bg-red-500 animate-pulse' :
        event.status === 'upcoming' ? 'bg-green-500' :
        'bg-gray-400'
      }`}></div>
    </div>
    
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex items-center gap-3">
        <Calendar className="w-4 h-4 text-blue-500" />
        <span>{new Date(event.date).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })}</span>
      </div>
      <div className="flex items-center gap-3">
        <Users className="w-4 h-4 text-purple-500" />
        <span>{event.attendees} people interested</span>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-orange-500" />
        <span className="capitalize">{event.type}</span>
      </div>
    </div>
    
    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        event.status === 'live' ? 'bg-red-100 text-red-700 ring-2 ring-red-200' :
        event.status === 'upcoming' ? 'bg-green-100 text-green-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {event.status === 'live' ? '🔴 Live Now' : 
         event.status === 'upcoming' ? '📅 Upcoming' :
         '📼 Recorded'}
      </span>
      <button className="px-4 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors">
        {event.status === 'recorded' ? 'Watch' : 'Join'}
      </button>
    </div>
  </div>
);

const EventCircle = ({ event, position, onHover, isHovered }) => {
  const getStatusStyle = (status) => {
    const baseStyle = "w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm transform transition-all duration-300 cursor-pointer border-4";
    
    switch(status) {
      case 'live': 
        return `${baseStyle} bg-gradient-to-br from-red-500 to-red-600 border-red-300 shadow-red-200 hover:shadow-red-300`;
      case 'upcoming': 
        return `${baseStyle} bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300 shadow-blue-200 hover:shadow-blue-300`;
      case 'recorded': 
        return `${baseStyle} bg-gradient-to-br from-gray-500 to-gray-600 border-gray-300 shadow-gray-200 hover:shadow-gray-300`;
      default: 
        return `${baseStyle} bg-gradient-to-br from-purple-500 to-purple-600 border-purple-300`;
    }
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isHovered ? 40 : 20
      }}
      onMouseEnter={(e) => onHover(event, e)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`${getStatusStyle(event.status)} ${isHovered ? 'scale-125 shadow-2xl' : 'hover:scale-110'}`}>
        {event.attendees}
      </div>
      
      {/* Connection lines for clustering effect */}
      <div className="absolute inset-0 pointer-events-none">
        {event.status === 'live' && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"></div>
            <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-20"></div>
          </>
        )}
      </div>
    </div>
  );
};

const EventsGathering = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [events, setEvents] = useState([]);
  const containerRef = useRef(null);

  // Generate natural clustering positions
  useEffect(() => {
    const generateNaturalPositions = () => {
      const clusters = [
        { centerX: 25, centerY: 30, radius: 15, count: 3 }, // Top-left cluster
        { centerX: 75, centerY: 25, radius: 20, count: 4 }, // Top-right cluster  
        { centerX: 40, centerY: 60, radius: 25, count: 3 }, // Center-bottom cluster
        { centerX: 70, centerY: 75, radius: 18, count: 0 }, // Bottom-right cluster
      ];
      
      const positions = [];
      let eventIndex = 0;
      
      // Distribute events across clusters
      clusters.forEach((cluster, clusterIndex) => {
        const eventsInCluster = Math.min(cluster.count || 2, sampleEvents.length - eventIndex);
        
        for (let i = 0; i < eventsInCluster && eventIndex < sampleEvents.length; i++) {
          // Create natural-looking positions within cluster
          const angle = (i / eventsInCluster) * Math.PI * 2 + Math.random() * 0.5;
          const distance = Math.random() * cluster.radius;
          
          const x = cluster.centerX + Math.cos(angle) * distance + (Math.random() - 0.5) * 8;
          const y = cluster.centerY + Math.sin(angle) * distance + (Math.random() - 0.5) * 8;
          
          positions.push({
            ...sampleEvents[eventIndex],
            position: {
              x: Math.max(8, Math.min(92, x)), // Keep within bounds
              y: Math.max(15, Math.min(85, y))
            }
          });
          eventIndex++;
        }
      });
      
      // Handle remaining events with scattered positioning
      // while (eventIndex < sampleEvents.length) {
      //   positions.push({
      //     ...sampleEvents[eventIndex],
      //     position: {
      //       x: 20 + Math.random() * 60,
      //       y: 20 + Math.random() * 60
      //     }
      //   });
      //   eventIndex++;
      // }
      
      return positions;
    };

    setEvents(generateNaturalPositions());
  }, []);

  const calculateCardPosition = (event, mouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const container = containerRef.current.getBoundingClientRect();
    const cardWidth = 320; // w-80 = 20rem = 320px
    const cardHeight = 220;
    
    // Get event circle position
    const eventX = (event.position.x / 100) * container.width;
    const eventY = (event.position.y / 100) * container.height;
    
    let x = eventX - cardWidth / 2;
    let y = eventY - cardHeight - 20; // Above by default
    let transform = 'translate(0, 0)';
    
    // Smart positioning with collision detection
    const padding = 16;
    
    // Check if card goes off right edge
    if (x + cardWidth > container.width - padding) {
      x = container.width - cardWidth - padding;
    }
    
    // Check if card goes off left edge
    if (x < padding) {
      x = padding;
    }
    
    // Check if card goes off top edge
    if (y < padding) {
      y = eventY + 40; // Show below instead
      // If still not enough space, show to the side
      if (y + cardHeight > container.height - padding) {
        y = eventY - cardHeight / 2;
        x = eventX + 60;
        // Check if side positioning works
        if (x + cardWidth > container.width - padding) {
          x = eventX - cardWidth - 60;
        }
      }
    }
    
    return { x, y, transform };
  };

  const handleEventHover = (event, mouseEvent) => {
    setHoveredEvent(event);
    
    if (event && mouseEvent) {
      const position = calculateCardPosition(event, mouseEvent);
      setCardPosition(position);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Events Community</h1>
          <p className="text-gray-600 text-lg">Join the conversation • Discover connections • Build together</p>
        </div>
      </div>

      {/* Events Container */}
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="relative w-full bg-white/30 backdrop-blur-sm rounded-3xl border border-white/50" 
             style={{ minHeight: '70vh', height: '70vh' }}>
          
          {events.map((event) => (
            <EventCircle
              key={event.id}
              event={event}
              position={event.position}
              onHover={handleEventHover}
              isHovered={hoveredEvent?.id === event.id}
            
            />
          ))}

          {/* Hover Card */}
          {hoveredEvent && (
            <div className="pointer-events-none">
              <div className="animate-in fade-in-0 zoom-in-95 duration-200">
                <EventCard 
                  event={hoveredEvent} 
                  position={cardPosition}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 mt-8 mb-6">
        <div className="container mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{events.filter(e => e.status === 'live').length}</div>
                <div className="text-sm text-gray-600">Live Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{events.filter(e => e.status === 'upcoming').length}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{events.filter(e => e.status === 'recorded').length}</div>
                <div className="text-sm text-gray-600">Recorded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{events.reduce((sum, e) => sum + e.attendees, 0)}</div>
                <div className="text-sm text-gray-600">Total Attendees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsGathering;