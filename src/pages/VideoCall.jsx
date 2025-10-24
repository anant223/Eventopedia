"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// import Floating3DHeader from "@/components/floating-3d-header"
import { Users, Clock, Video, Eye, Sparkles, Search, Briefcase, Code, Palette, GraduationCap, TrendingUp, Heart, UserPlus, Star, Radio, Wifi } from 'lucide-react'

// Floating Interest Orbs for Filtering
function InterestOrb({
  interest,
  position,
  isActive,
  onToggle,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: position.z,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHovered ? 1.3 : isActive ? 1.1 : 0.8,
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onToggle}
    >
      <motion.div
        className={`w-20 h-20 rounded-full border-2 backdrop-blur-xl flex items-center justify-center ${
          isActive
            ? `border-${interest.color}-400 bg-${interest.color}-500/20 shadow-[0_0_20px_rgba(${interest.rgb},0.4)]`
            : "border-gray-600 bg-gray-800/30"
        }`}
        animate={
          isActive
            ? {
                boxShadow: `0 0 30px rgba(${interest.rgb}, 0.6)`,
                rotate: [0, 360],
              }
            : {}
        }
        transition={{
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
      >
        <interest.icon className={`w-6 h-6 ${isActive ? `text-${interest.color}-400` : "text-gray-400"}`} />
      </motion.div>

      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        animate={{ opacity: isHovered || isActive ? 1 : 0.7 }}
      >
        <span
          className={`text-xs font-medium ${
            isActive ? `text-${interest.color}-400` : "text-gray-400"
          } bg-gray-900/80 px-2 py-1 rounded-full backdrop-blur-sm`}
        >
          {interest.name}
        </span>
      </motion.div>

      {isActive && (
        <svg className="absolute inset-0 pointer-events-none w-screen h-screen" style={{ left: "-50vw", top: "-50vh" }}>
          <motion.circle
            cx="50%"
            cy="50%"
            r="100"
            fill="none"
            stroke={`rgba(${interest.rgb}, 0.3)`}
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        </svg>
      )}
    </motion.div>
  )
}

// Professional Avatar component (keeping the same as before)
function ProfessionalAvatar({
  professional,
  position,
  onConnect,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: position.z,
      }}
      initial={{ scale: 0, y: 50 }}
      animate={{
        scale: isHovered ? 1.2 : 1,
        y: [0, -10, 0],
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
        y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onConnect}
    >
      <motion.div
        className={`w-16 h-16 rounded-full border-2 ${
          professional.online ? "border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "border-gray-500"
        } backdrop-blur-xl overflow-hidden`}
        animate={
          professional.online
            ? {
                borderColor: ["#22c55e", "#10b981", "#22c55e"],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{professional.name[0]}</span>
        </div>
      </motion.div>

      {professional.online && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      {isHovered && (
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 p-3 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm">{professional.name}</h3>
            <p className="text-gray-400 text-xs mb-1">{professional.title}</p>
            <p className="text-gray-500 text-xs mb-2">{professional.company}</p>

            <div className="flex items-center justify-center space-x-3 text-xs text-gray-400 mb-2">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{professional.connections}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span>{professional.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {professional.skills.slice(0, 2).map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <Button size="sm" className="w-full text-xs bg-gradient-to-r from-green-600 to-blue-600">
              <UserPlus className="w-3 h-3 mr-1" />
              Connect
            </Button>
          </div>
        </motion.div>
      )}

      {professional.currentEvent && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-red-500/80 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="text-white text-xs font-medium">LIVE</span>
        </motion.div>
      )}
    </motion.div>
  )
}

// Enhanced Event Portal (keeping the same as before)
function EventPortal({
  event,
  position,
  onEnter,
  isHighlighted,
  connectedInterests,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    if (event.status === "live") {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [event.status])

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: position.z,
      }}
      initial={{ scale: 0, rotateY: -180, opacity: 0 }}
      animate={{
        scale: isHovered ? 1.3 : isHighlighted ? 1.1 : 1,
        rotateY: 0,
        rotateX: isHovered ? 10 : 0,
        opacity: isHighlighted ? 1 : connectedInterests.length > 0 ? 0.4 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onEnter}
    >
      <div className="relative">
        <motion.div
          className={`w-32 h-32 rounded-full border-4 backdrop-blur-xl ${
            event.status === "live"
              ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
              : event.status === "upcoming"
                ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                : "border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.5)]"
          } ${isHighlighted ? "ring-4 ring-yellow-400/50" : ""}`}
          animate={{
            rotate: event.status === "live" ? 360 : 0,
            borderWidth: isHovered ? 6 : isHighlighted ? 5 : 4,
            scale: isHighlighted ? 1.05 : 1,
          }}
          transition={{
            rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            borderWidth: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
        />

        <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1">
                <span className="text-white font-bold text-xs">{event.host[0]}</span>
              </div>
              <p className="text-white text-xs font-medium text-center leading-tight">{event.title.slice(0, 20)}...</p>
              <div className="flex items-center space-x-1 mt-1">
                <Eye className="w-3 h-3 text-gray-300" />
                <span className="text-gray-300 text-xs">{event.viewers}</span>
              </div>
            </div>
          </div>

          {event.status === "live" && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-400 rounded-full"
                  animate={{
                    height: [2, Math.random() * audioLevel * 0.2 + 4, 2],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {isHighlighted && connectedInterests.length > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none w-screen h-screen"
            style={{ left: "-50vw", top: "-50vh" }}
          >
            {connectedInterests.map((_, i) => (
              <motion.path
                key={i}
                d={`M 50% 50% Q ${50 + Math.random() * 20}% ${30 + Math.random() * 20}% ${70 + Math.random() * 20}% ${20 + Math.random() * 20}%`}
                stroke="rgba(59, 130, 246, 0.6)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            ))}
          </svg>
        )}

        {isHovered && (
          <motion.div
            className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-80 p-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{event.title}</h3>
                <p className="text-gray-400 text-xs mb-1">
                  {event.host} • {event.category}
                </p>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  event.status === "live"
                    ? "bg-red-500/20 text-red-400"
                    : event.status === "upcoming"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {event.status}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs mb-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{event.attendees}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{event.likes}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {event.tags?.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-full text-xs ${
                    connectedInterests.includes(tag.toLowerCase())
                      ? "bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-400/30"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {event.attendeeAvatars?.slice(0, 4).map((avatar, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-gray-900 flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">{avatar}</span>
                  </div>
                ))}
                {event.attendees > 4 && (
                  <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <span className="text-gray-300 text-xs">+{event.attendees - 4}</span>
                  </div>
                )}
              </div>

              <Button size="sm" className="text-xs">
                {event.status === "live" ? "Join Now" : "Register"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Immersive Space (keeping the same as before)
function ImmersiveSpace() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight || 800], [5, -5]))
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth || 1200], [-5, 5]))

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translateZ(${Math.random() * 300 - 150}px)`,
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            z: [0, 100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 25 + 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className={`w-3 h-3 ${
              i % 4 === 0
                ? "bg-blue-500/20"
                : i % 4 === 1
                  ? "bg-purple-500/20"
                  : i % 4 === 2
                    ? "bg-pink-500/20"
                    : "bg-green-500/20"
            } ${i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rotate-45 rounded-sm" : "rounded-full"} backdrop-blur-sm`}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: "perspective(1000px) rotateX(60deg)",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "80px 80px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  )
}

// Central Search Orb (keeping the same as before)
function CentralSearchOrb({ onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
      animate={{ scale: isExpanded ? 1.2 : 1 }}
    >
      <motion.div className="relative" onHoverStart={() => setIsExpanded(true)} onHoverEnd={() => setIsExpanded(false)}>
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-xl"
          animate={{
            boxShadow: isExpanded
              ? "0 0 60px rgba(59,130,246,0.8), 0 0 120px rgba(147,51,234,0.6)"
              : "0 0 30px rgba(59,130,246,0.5)",
            rotate: [0, 360],
          }}
          transition={{
            rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-8 h-8 text-white" />
        </motion.div>

        {isExpanded && (
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-80"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search events, people, topics..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  onSearch(e.target.value)
                }}
                className="w-full px-6 py-4 bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center"
                autoFocus
              />
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-500/30"
                animate={{ borderColor: ["rgba(59,130,246,0.3)", "rgba(147,51,234,0.3)", "rgba(59,130,246,0.3)"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        )}

        {isExpanded && (
          <div className="absolute inset-0">
            {[
              { icon: Video, label: "Host", angle: 0, color: "from-red-500 to-pink-500" },
              { icon: Users, label: "Network", angle: 120, color: "from-green-500 to-emerald-500" },
              { icon: Sparkles, label: "Discover", angle: 240, color: "from-yellow-500 to-orange-500" },
            ].map((item, i) => (
              <motion.button
                key={item.label}
                className={`absolute w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg`}
                style={{
                  left: `${50 + Math.cos((item.angle * Math.PI) / 180) * 60}px`,
                  top: `${50 + Math.sin((item.angle * Math.PI) / 180) * 60}px`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, rotate: -item.angle }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 25 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className="w-5 h-5 text-white" />
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function RevolutionaryEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [activeInterests, setActiveInterests] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isNetworkOpen, setIsNetworkOpen] = useState(false)

  // Interest categories floating in 3D space
  const interests = [
    { id: "ai", name: "AI & ML", icon: Sparkles, color: "blue", rgb: "59,130,246", position: { x: 20, y: 25, z: 15 } },
    {
      id: "startup",
      name: "Startups",
      icon: Briefcase,
      color: "green",
      rgb: "34,197,94",
      position: { x: 80, y: 20, z: 12 },
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      color: "pink",
      rgb: "236,72,153",
      position: { x: 15, y: 70, z: 18 },
    },
    { id: "tech", name: "Tech", icon: Code, color: "purple", rgb: "147,51,234", position: { x: 85, y: 75, z: 10 } },
    {
      id: "marketing",
      name: "Marketing",
      icon: TrendingUp,
      color: "orange",
      rgb: "249,115,22",
      position: { x: 50, y: 15, z: 20 },
    },
    {
      id: "education",
      name: "Learning",
      icon: GraduationCap,
      color: "indigo",
      rgb: "99,102,241",
      position: { x: 25, y: 85, z: 8 },
    },
  ]

  // Professional avatars floating in space
  const professionals = [
    {
      name: "Sarah Chen",
      title: "AI Research Director",
      company: "TechCorp",
      online: true,
      connections: 1247,
      rating: 4.9,
      skills: ["AI", "Machine Learning"],
      position: { x: 35, y: 40, z: 25 },
      currentEvent: "AI Revolution Summit",
    },
    {
      name: "Mike Rodriguez",
      title: "Startup Founder",
      company: "InnovateLab",
      online: true,
      connections: 892,
      rating: 4.8,
      skills: ["Entrepreneurship", "Product"],
      position: { x: 70, y: 45, z: 22 },
    },
    {
      name: "Lisa Wang",
      title: "UX Design Lead",
      company: "Creative Co",
      online: false,
      connections: 634,
      rating: 4.9,
      skills: ["UX Design", "Research"],
      position: { x: 45, y: 65, z: 18 },
    },
    {
      name: "David Kim",
      title: "Marketing Director",
      company: "GrowthLab",
      online: true,
      connections: 456,
      rating: 4.7,
      skills: ["Digital Marketing", "Growth"],
      position: { x: 65, y: 30, z: 15 },
      currentEvent: "Marketing Psychology",
    },
  ]

  // Enhanced events with more data
  const allEvents = [
    {
      id: 1,
      title: "AI Revolution Summit",
      description: "Exploring the future of artificial intelligence and its impact on society.",
      host: "Dr. Sarah Chen",
      hostTitle: "AI Research Director",
      category: "tech",
      status: "live",
      time: "Now",
      duration: "45 min",
      viewers: 1247,
      attendees: 856,
      likes: 234,
      position: { x: 25, y: 35, z: 15 },
      tags: ["AI", "Machine Learning", "Future Tech", "Innovation"],
      attendeeAvatars: ["S", "M", "L", "D"],
      interests: ["ai", "tech"],
    },
    {
      id: 2,
      title: "Startup Funding Masterclass",
      description: "Learn how to secure funding for your startup from industry veterans.",
      host: "Michael Rodriguez",
      hostTitle: "Venture Capitalist",
      category: "business",
      status: "live",
      time: "Now",
      duration: "60 min",
      viewers: 892,
      attendees: 634,
      likes: 189,
      position: { x: 75, y: 25, z: 20 },
      tags: ["Startup Funding", "Venture Capital", "Entrepreneurship", "Investment"],
      attendeeAvatars: ["M", "A", "R", "K"],
      interests: ["startup", "tech"],
    },
    {
      id: 3,
      title: "Design Thinking Workshop",
      description: "Hands-on workshop on human-centered design principles.",
      host: "Emma Thompson",
      hostTitle: "Design Lead at Apple",
      category: "design",
      status: "upcoming",
      time: "2:00 PM",
      duration: "90 min",
      viewers: 0,
      attendees: 423,
      likes: 156,
      position: { x: 40, y: 70, z: 12 },
      tags: ["UX Design", "Design Thinking", "User Research", "Product Design"],
      attendeeAvatars: ["E", "T", "J", "P"],
      interests: ["design"],
    },
    {
      id: 4,
      title: "Marketing Psychology Deep Dive",
      description: "The psychology behind effective marketing campaigns and consumer behavior.",
      host: "Lisa Wang",
      hostTitle: "Marketing Director",
      category: "marketing",
      status: "upcoming",
      time: "4:00 PM",
      duration: "40 min",
      viewers: 0,
      attendees: 298,
      likes: 87,
      position: { x: 80, y: 60, z: 18 },
      tags: ["Digital Marketing", "Psychology", "Consumer Behavior", "Growth"],
      attendeeAvatars: ["L", "W", "C", "B"],
      interests: ["marketing"],
    },
    {
      id: 5,
      title: "Future of Remote Learning",
      description: "How technology is reshaping education and professional development.",
      host: "Dr. James Wilson",
      hostTitle: "EdTech Researcher",
      category: "education",
      status: "recorded",
      time: "Yesterday",
      duration: "75 min",
      viewers: 1834,
      attendees: 1245,
      likes: 456,
      position: { x: 30, y: 80, z: 10 },
      tags: ["Education", "Remote Learning", "EdTech", "Professional Development"],
      attendeeAvatars: ["J", "W", "R", "S"],
      interests: ["education", "tech"],
    },
  ]

  // Filter events based on active interests and search
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesInterests =
      activeInterests.length === 0 || activeInterests.some((interest) => event.interests.includes(interest))

    return matchesSearch && matchesInterests
  })

  const handleInterestToggle = (interestId) => {
    setActiveInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const handleEventEnter = (event) => {
    setSelectedEvent(event)
  }

  const liveEvents = filteredEvents.filter((e) => e.status === "live")
  const totalViewers = liveEvents.reduce((sum, e) => sum + e.viewers, 0)
  const onlineProfessionals = professionals.filter((p) => p.online).length

  return (
    <div className="min-h-screen bg-[#05101c] relative overflow-hidden">
      {/* Enhanced Immersive Background */}
      <ImmersiveSpace />

      {/* Revolutionary 3D Floating Header */}
      

      {/* Central Search Orb */}
      {/* <CentralSearchOrb onSearch={setSearchQuery} /> */}

      {/* Floating Interest Orbs */}
      {interests.map((interest) => (
        <InterestOrb
          key={interest.id}
          interest={interest}
          position={interest.position}
          isActive={activeInterests.includes(interest.id)}
          onToggle={() => handleInterestToggle(interest.id)}
        />
      ))}

      {/* Floating Professional Avatars */}
      {professionals.map((professional, index) => (
        <ProfessionalAvatar
          key={index}
          professional={professional}
          position={professional.position}
          onConnect={() => console.log(`Connecting to ${professional.name}`)}
        />
      ))}

      {/* Enhanced Event Portals */}
      {filteredEvents.map((event) => (
        <EventPortal
          key={event.id}
          event={event}
          position={event.position}
          onEnter={() => handleEventEnter(event)}
          isHighlighted={activeInterests.some((interest) => event.interests.includes(interest))}
          connectedInterests={activeInterests.filter((interest) => event.interests.includes(interest))}
        />
      ))}

      {/* Floating Instructions */}
      {/* <motion.div
        className="fixed bottom-8 left-8 backdrop-blur-xl bg-gray-900/20 border border-gray-700/20 rounded-2xl p-6 max-w-sm"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h3 className="text-white font-bold mb-3 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
          Navigate the Universe
        </h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>
            • <strong>Hover header elements</strong> for quick actions
          </li>
          <li>
            • <strong>Click interest orbs</strong> to filter events
          </li>
          <li>
            • <strong>Connect with professionals</strong> floating around
          </li>
          <li>
            • <strong>Enter event portals</strong> to join live sessions
          </li>
          <li>
            • <strong>Move mouse</strong> to explore 3D space
          </li>
        </ul>
      </motion.div> */}

      {/* Active Filters Display */}
      {(activeInterests.length > 0 || searchQuery) && (
        <motion.div
          className="fixed bottom-8 right-8 backdrop-blur-xl bg-gray-900/20 border border-gray-700/20 rounded-2xl p-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h4 className="text-white font-semibold mb-2">Active Filters</h4>
          <div className="space-y-2">
            {searchQuery && (
              <div className="flex items-center space-x-2">
                <Search className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-sm">"{searchQuery}"</span>
              </div>
            )}
            
          </div>
          <p className="text-gray-400 text-xs mt-2">{filteredEvents.length} events match</p>
        </motion.div>
      )}
    </div>
  )
}
