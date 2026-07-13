import { useState, useMemo, memo } from 'react'
import { Search, MapPin, Clock, Users, ChevronRight, X, ChevronsLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'



const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    category: 'Technology',
    date: 'Mar 15, 2025',
    time: '9:00 AM',
    location: 'San Francisco, CA',
    attendees: 1250,
    image: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=400&h=300&fit=crop',
    description: 'Discover the latest innovations in technology and network with industry leaders.',
  },
  {
    id: '2',
    title: 'Design Workshop',
    category: 'Design',
    date: 'Mar 18, 2025',
    time: '2:00 PM',
    location: 'New York, NY',
    attendees: 320,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    description: 'Learn advanced design principles from world-class designers.',
  },
  {
    id: '3',
    title: 'Music Festival',
    category: 'Music',
    date: 'Mar 22, 2025',
    time: '6:00 PM',
    location: 'Los Angeles, CA',
    attendees: 5000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Experience amazing performances from top artists worldwide.',
  },
  {
    id: '4',
    title: 'Business Networking Expo',
    category: 'Business',
    date: 'Mar 20, 2025',
    time: '10:00 AM',
    location: 'Chicago, IL',
    attendees: 800,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    description: 'Connect with entrepreneurs and business professionals.',
  },
  {
    id: '5',
    title: 'Yoga & Wellness Retreat',
    category: 'Wellness',
    date: 'Mar 25, 2025',
    time: '7:00 AM',
    location: 'Miami, FL',
    attendees: 180,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop',
    description: 'Rejuvenate your mind and body in a peaceful setting.',
  },
  {
    id: '6',
    title: 'Sports Championship',
    category: 'Sports',
    date: 'Mar 28, 2025',
    time: '7:30 PM',
    location: 'Boston, MA',
    attendees: 3500,
    image: 'https://images.unsplash.com/photo-1624526267942-ab67cb38121d?w=400&h=300&fit=crop',
    description: 'Watch elite athletes compete at the highest level.',
  },
  {
    id: '7',
    title: 'Startup Pitch Night',
    category: 'Technology',
    date: 'Apr 1, 2025',
    time: '6:00 PM',
    location: 'Austin, TX',
    attendees: 450,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    description: 'Innovative startups present their groundbreaking ideas.',
  },
  {
    id: '8',
    title: 'Art Exhibition Opening',
    category: 'Art',
    date: 'Apr 5, 2025',
    time: '5:00 PM',
    location: 'Seattle, WA',
    attendees: 600,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    description: 'Explore contemporary art from emerging artists.',
  },
]

const CATEGORIES = ['All', 'Technology', 'Design', 'Music', 'Business', 'Wellness', 'Sports', 'Art']

const getCategoryColor = (category) => {
  const colors = {
    Technology: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Design: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Music: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    Business: 'bg-green-500/20 text-green-300 border-green-500/30',
    Wellness: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    Sports: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    Art: 'bg-red-500/20 text-red-300 border-red-500/30',
  }
  return colors[category] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'
}

const EventList = memo(({ onEventClick }) => {
  const [isHide, setIsHide] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return isHide ? (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Mobile: Full screen overlay */}
      <div className="absolute inset-0 sm:hidden pointer-events-auto bg-slate-950/80 backdrop-blur-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-900/40">
          <h2 className="text-xl font-bold text-white mb-1">Discover Events</h2>
          <p className="text-xs text-slate-400">
            Find something amazing near you
          </p>
        </div>

        {/* Search */}
        <div className="px-4 pt-4 pb-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/60 border-slate-800/60 text-white placeholder:text-slate-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 backdrop-blur-sm hover:bg-slate-900/80 transition-all text-sm"
            />
          </div>
          <button
            onClick={() => {
              /* Add your location handler */
            }}
            className="p-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-yellow-500/40 rounded-lg transition-all group"
            aria-label="Use my location"
          >
            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-3">
          <ScrollArea className="pb-2">
            <div className="flex gap-2 pr-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-2.5 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-all duration-200",
                    selectedCategory === category
                      ? "bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20"
                      : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Events List - Scrollable */}
        <ScrollArea className="flex-1 px-4 pb-4">
          <div className="space-y-2 pr-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() =>
                    setSelectedEvent(
                      selectedEvent === event.id ? null : event.id
                    )
                  }
                  className={cn(
                    "w-full text-left rounded-lg border transition-all duration-200 p-2.5 group hover:bg-slate-800/60",
                    selectedEvent === event.id
                      ? "bg-slate-800/80 border-yellow-500/50 shadow-lg shadow-yellow-500/10"
                      : "bg-slate-900/60 border-slate-800/60 hover:border-yellow-500/30"
                  )}
                >
                  <div className="flex gap-2.5">
                    {/* Image */}
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800/60">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate text-xs group-hover:text-yellow-400 transition-colors">
                          {event.title}
                        </h3>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "mb-1 border text-xs",
                          getCategoryColor(event.category)
                        )}
                      >
                        {event.category}
                      </Badge>

                      {/* Meta Info */}
                      <div className="space-y-0.5 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span className="truncate">
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedEvent === event.id && (
                        <div className="mt-2 pt-2 border-t border-slate-800/60 animate-in fade-in duration-200">
                          <p className="text-xs text-slate-300 leading-relaxed mb-2">
                            {event.description}
                          </p>
                          <button
                            onClick={() => onEventClick?.()}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-1.5 rounded-lg transition-colors text-xs"
                          >
                            Get Tickets
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <p className="text-slate-400 text-xs font-medium">
                    No events found
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Try adjusting your search
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
      </div>

      {/* Tablet & Desktop: Sidebar overlay */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-6 md:left-10 md:right-auto md:w-96 pointer-events-auto px-4 rounded-xl">
        {/* Background with gradient - improved colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-slate-950/98 backdrop-blur-xl rounded-xl border border-slate-800/60 shadow-2xl shadow-black/40 -z-10"></div>

        {/* Unique Hide Button - Updated color to match theme */}
        <button
          onClick={() => setIsHide(false)}
          className="absolute -right-3 top-6 p-2 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-400 hover:to--500 shadow-lg shadow-blue-500/40 text-white transition-all hover:scale-110 group z-10"
          aria-label="Hide panel"
        >
          <ChevronsLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Header */}
        <div className="mb-4 pt-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Discover Events
          </h2>
          <p className="text-sm text-slate-400">
            Find something amazing near you
          </p>
        </div>

        {/* Search and Location */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            <Input
              placeholder="Search events, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/60 border-slate-800/60 text-white placeholder:text-slate-500 focus:border-yellow-500/50 focus:ring-yellow-500/20 backdrop-blur-sm hover:bg-slate-900/80 transition-all"
            />
          </div>

          <button
            onClick={() => {
              /* Add your location handler */
            }}
            className="px-4 py-2 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-yellow-500/40 rounded-lg transition-all group flex items-center gap-2 text-slate-400 hover:text-yellow-400 whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Near Me</span>
          </button>
        </div>

        <ScrollArea className="mb-4 pb-2">
          <div className="flex gap-2 pr-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200",
                  selectedCategory === category
                    ? "bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20"
                    : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[420px] rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-lg overflow-hidden">
          <div className="p-3 space-y-2">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() =>
                    setSelectedEvent(
                      selectedEvent === event.id ? null : event.id
                    )
                  }
                  className={cn(
                    "w-full text-left rounded-lg border transition-all duration-200 p-3 group hover:bg-slate-800/60",
                    selectedEvent === event.id
                      ? "bg-slate-800/80 border-yellow-500/50 shadow-lg shadow-yellow-500/10"
                      : "bg-slate-900/60 border-slate-800/60 hover:border-yellow-500/30"
                  )}
                >
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800/60">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate text-sm group-hover:text-yellow-400 transition-colors">
                          {event.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "mb-2 border",
                          getCategoryColor(event.category)
                        )}
                      >
                        {event.category}
                      </Badge>

                      {/* Meta Info */}
                      <div className="space-y-1 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedEvent === event.id && (
                        <div className="mt-3 pt-3 border-t border-slate-800/60 animate-in fade-in duration-200">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {event.description}
                          </p>
                          <button
                            onClick={() => onEventClick?.()}
                            className="mt-2 w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-2 rounded-lg transition-colors text-sm"
                          >
                            Get Tickets
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-center py-8">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    No events found
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-3 pb-6 text-xs text-slate-500 text-center">
          Showing {filteredEvents.length} of {MOCK_EVENTS.length} events
        </div>
      </div>
    </div>
  ) : (
    <div className="p-5 overflow-hidden w-[60px] h-[60px] bg-gradient-to-br from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 shadow-lg shadow-yellow-500/30 rounded-full flex group items-center hover:scale-110 hover:duration-300 duration-300 absolute bottom-8 left-6 cursor-pointer">
      <button
        onClick={() => setIsHide(true)}
        type="button"
        className="flex items-center justify-center fill-white"
      >
        <span>
          <Search className="text-slate-900" />
        </span>
      </button>
    </div>
  );

})

EventList.displayName = "EventList";
export default EventList;
