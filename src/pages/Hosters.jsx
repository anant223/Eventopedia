"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Clock,
  Calendar,
  Share2,
  Heart,
  MessageCircle,
  Video,
  Globe,
  Star,
  Eye,
  ChevronRight,
  Send,
  Sparkles,
  Radio,
  UserPlus,
  Download,
  CheckCircle,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Play,
  Bookmark,
  BookmarkCheck,
  Cpu,
  Music,
  Dumbbell,
  GraduationCap,
  Briefcase,
  Stethoscope,
} from "lucide-react"

// Mock event data - in real app, this would come from API
const mockEvent = {
  id: "1",
  title: "AI Revolution Summit: The Future of Artificial Intelligence",
  desc: "Join leading AI researchers and industry experts as we explore the cutting-edge developments in artificial intelligence, machine learning, and their transformative impact on society. This comprehensive summit covers everything from ethical AI to breakthrough technologies that will shape our future.",
  thumbnail: "/placeholder.svg?height=400&width=800&text=AI+Revolution+Summit",
  duration: "3 hours",
  category: "tech",
  startingDate: new Date("2024-12-25T14:00:00"),
  time: "14:00",
  url: "https://zoom.us/j/123456789",
  tag: "AI, Machine Learning, Future Tech, Innovation, Ethics",
  status: "upcoming",
  eventType: "public",
  host: {
    id: "host1",
    name: "Dr. Sarah Chen",
    avatar: "/placeholder.svg?height=100&width=100&text=SC",
    title: "AI Research Director",
    company: "TechCorp",
    bio: "Leading AI researcher with over 15 years of experience in machine learning, neural networks, and ethical AI development.",
    followers: 2340,
    rating: 4.9,
    eventsHosted: 47,
    verified: true,
  },
  participants: 856,
  maxCapacity: 1000,
  spotsLeft: 144,
  viewers: 1247,
  likes: 234,
  rating: 4.9,
  price: "Free",
  registrationRequired: true,
  language: "English",
  subtitlesAvailable: true,
  recordingAvailable: true,
  materials: [
    { name: "AI Revolution Slides", type: "PDF", size: "2.4 MB" },
    { name: "Research Paper", type: "PDF", size: "1.8 MB" },
    { name: "Code Examples", type: "GitHub", size: "Repository" },
  ],
  agenda: [
    { time: "2:00 PM", title: "Opening Keynote", speaker: "Dr. Sarah Chen", duration: "30 min" },
    { time: "2:30 PM", title: "AI Ethics Panel", speaker: "Panel Discussion", duration: "45 min" },
    { time: "3:15 PM", title: "Technical Deep Dive", speaker: "Dr. Sarah Chen", duration: "60 min" },
    { time: "4:15 PM", title: "Q&A Session", speaker: "Interactive", duration: "30 min" },
  ],
  speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "AI Research Director",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=80&width=80&text=SC",
      bio: "Leading expert in machine learning and neural networks.",
    },
    {
      name: "Prof. Michael Johnson",
      title: "Ethics Professor",
      company: "Stanford University",
      avatar: "/placeholder.svg?height=80&width=80&text=MJ",
      bio: "Renowned expert in AI ethics and responsible technology.",
    },
  ],
  relatedEvents: [
    {
      id: "2",
      title: "Machine Learning Workshop",
      host: "Prof. Johnson",
      date: "Tomorrow 2 PM",
      type: "Virtual",
      thumbnail: "/placeholder.svg?height=200&width=300&text=ML+Workshop",
    },
    {
      id: "3",
      title: "Ethics in AI Panel",
      host: "Dr. Williams",
      date: "Friday 4 PM",
      type: "In-Person",
      thumbnail: "/placeholder.svg?height=200&width=300&text=AI+Ethics",
    },
  ],
}

// Category icons mapping
const categoryIcons = {
  tech: Cpu,
  business: Briefcase,
  health: Stethoscope,
  education: GraduationCap,
  entertainment: Music,
  sports: Dumbbell,
  other: Sparkles,
}

// Live Chat Component
function LiveChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah M.",
      message: "This looks amazing! Can't wait to join! 🚀",
      time: "2:34 PM",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      isHost: false,
    },
    {
      id: 2,
      user: "Mike R.",
      message: "Great insights on AI ethics in the preview",
      time: "2:35 PM",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      isHost: false,
    },
    {
      id: 3,
      user: "Dr. Chen",
      message: "Thanks everyone! Looking forward to our discussion",
      time: "2:36 PM",
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
      isHost: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          avatar: "/placeholder.svg?height=40&width=40&text=Y",
          isHost: false,
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-lg">Live Chat</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">847 online</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto max-h-80">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              className={`flex items-start gap-3 p-3 rounded-xl ${
                msg.isHost ? "bg-blue-500/10 border border-blue-500/20" : "bg-white/5"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                  {msg.user.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-medium text-sm ${msg.isHost ? "text-blue-400" : "text-gray-300"}`}>
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                  {msg.isHost && <Star className="w-3 h-3 text-yellow-400" />}
                </div>
                <p className="text-gray-200 text-sm break-words">{msg.message}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
          />
          <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700 px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Event Stats Component
function EventStats({ event}) {
  const stats = [
    { icon: Users, label: "Registered", value: event.participants, color: "text-blue-400", bg: "bg-blue-500/20" },
    { icon: Eye, label: "Interested", value: event.viewers, color: "text-green-400", bg: "bg-green-500/20" },
    { icon: Heart, label: "Likes", value: event.likes, color: "text-pink-400", bg: "bg-pink-500/20" },
    { icon: Star, label: "Rating", value: event.rating, color: "text-yellow-400", bg: "bg-yellow-500/20" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={`text-center p-4 ${stat.bg} rounded-xl border border-white/20`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default function EventDetailPage({ params  }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showShareModal, setShowShareModal] = useState(false)

  const event = mockEvent
  const CategoryIcon = categoryIcons[event.category]

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const shareEvent = (platform) => {
    const url = window.location.href
    const text = `Check out this amazing event: ${event.title}`

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(event.title)}&summary=${encodeURIComponent(event.desc.slice(0, 200))}`,
        )
        break
      case "copy":
        navigator.clipboard.writeText(url)
        break
    }
    setShowShareModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

    

      {/* Main Content */}
      <div className="relative z-10 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Header */}
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Event Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img
                    src={event.thumbnail || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(event.status)} border font-medium px-3 py-1`}>
                      {event.status === "live" && <Radio className="w-3 h-3 mr-1" />}
                      {event.status.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Event Type Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border font-medium px-3 py-1">
                      <Globe className="w-3 h-3 mr-1" />
                      {event.eventType.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Play Button for Live Events */}
                  {event.status === "live" && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Event Info */}
                <div className="space-y-6">
                  {/* Title and Category */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <CategoryIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <Badge variant="outline" className="border-white/20 text-gray-300 bg-white/5">
                        {event.category.toUpperCase()}
                      </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                      {event.title}
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{event.desc}</p>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-white font-medium">{formatDate(event.startingDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Clock className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Time</p>
                        <p className="text-white font-medium">{formatTime(event.startingDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Users className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Duration</p>
                        <p className="text-white font-medium">{event.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tag.split(", ").map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      size="lg"
                      className={`flex-1 ${
                        isRegistered
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      } text-white font-semibold shadow-xl`}
                      onClick={() => setIsRegistered(!isRegistered)}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Registered
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5 mr-2" />
                          Register Now
                        </>
                      )}
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => setShowShareModal(true)}
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Event Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <EventStats event={event} />
              </motion.div>

              {/* Host Information */}
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-400" />
                  About the Host
                </h3>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={event.host.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                      {event.host.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white font-bold text-lg">{event.host.name}</h4>
                      {event.host.verified && <CheckCircle className="w-5 h-5 text-blue-400" />}
                    </div>
                    <p className="text-blue-400 font-medium mb-2">{event.host.title}</p>
                    <p className="text-gray-300 mb-3">{event.host.bio}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.host.followers} followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{event.host.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        <span>{event.host.eventsHosted} events</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent hover:bg-white/10"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tabbed Content */}
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Tab Navigation */}
                <div className="flex items-center border-b border-white/10 p-2 overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: Eye },
                    { id: "agenda", label: "Agenda", icon: Clock },
                    { id: "speakers", label: "Speakers", icon: Users },
                    { id: "materials", label: "Materials", icon: BookOpen },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-white font-semibold text-lg mb-3">Event Details</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg">
                              <p className="text-gray-400 text-sm mb-1">Language</p>
                              <p className="text-white font-medium">{event.language}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                              <p className="text-gray-400 text-sm mb-1">Price</p>
                              <p className="text-green-400 font-medium">{event.price}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                              <p className="text-gray-400 text-sm mb-1">Subtitles</p>
                              <p className="text-white font-medium">
                                {event.subtitlesAvailable ? "Available" : "Not Available"}
                              </p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                              <p className="text-gray-400 text-sm mb-1">Recording</p>
                              <p className="text-white font-medium">
                                {event.recordingAvailable ? "Available" : "Not Available"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {event.url && (
                          <div>
                            <h4 className="text-white font-semibold text-lg mb-3">Join Event</h4>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-blue-400 font-medium mb-1">Event Link</p>
                                  <p className="text-gray-300 text-sm">Click to join the event</p>
                                </div>
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => window.open(event.url, "_blank")}
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Join
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "agenda" && (
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg mb-4">Event Schedule</h4>
                        {event.agenda.map((item, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="text-center min-w-[80px]">
                              <div className="text-blue-400 font-bold">{item.time}</div>
                              <div className="text-gray-500 text-sm">{item.duration}</div>
                            </div>
                            <div className="w-px h-12 bg-gray-600" />
                            <div className="flex-1">
                              <h5 className="text-white font-semibold mb-1">{item.title}</h5>
                              <p className="text-gray-400 text-sm">{item.speaker}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === "speakers" && (
                      <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg mb-4">Featured Speakers</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {event.speakers.map((speaker, i) => (
                            <motion.div
                              key={i}
                              className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <div className="flex items-start gap-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={speaker.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    {speaker.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h5 className="text-white font-semibold mb-1">{speaker.name}</h5>
                                  <p className="text-blue-400 text-sm mb-1">{speaker.title}</p>
                                  <p className="text-gray-400 text-sm mb-2">{speaker.company}</p>
                                  <p className="text-gray-300 text-sm">{speaker.bio}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "materials" && (
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg mb-4">Event Materials</h4>
                        {event.materials.map((material, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-500/20 rounded-lg">
                                <BookOpen className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <h5 className="text-white font-medium">{material.name}</h5>
                                <p className="text-gray-400 text-sm">
                                  {material.type} • {material.size}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Live Chat */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <LiveChat />
              </motion.div>

              {/* Related Events */}
              <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-3 text-purple-400" />
                  Related Events
                </h3>
                <div className="space-y-4">
                  {event.relatedEvents.map((relatedEvent, i) => (
                    <motion.div
                      key={relatedEvent.id}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div className="flex gap-3">
                        <img
                          src={relatedEvent.thumbnail || "/placeholder.svg"}
                          alt={relatedEvent.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">
                            {relatedEvent.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">by {relatedEvent.host}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-400 text-sm">{relatedEvent.date}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                relatedEvent.type === "Virtual"
                                  ? "border-green-500/30 text-green-400"
                                  : "border-blue-500/30 text-blue-400"
                              }`}
                            >
                              {relatedEvent.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowShareModal(false)}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-bold text-xl mb-4">Share Event</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30"
                onClick={() => shareEvent("twitter")}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="bg-blue-800/20 border-blue-700/30 text-blue-300 hover:bg-blue-800/30"
                onClick={() => shareEvent("facebook")}
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="bg-blue-700/20 border-blue-600/30 text-blue-300 hover:bg-blue-700/30"
                onClick={() => shareEvent("linkedin")}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => shareEvent("copy")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
  // <VideoCall />
// {/* <div className="min-h-screen bg-background w-full relative lg:ml-64 md:ml-64 sm:ml-0 ml-0 ">
//       <Container>
//         {isLoading ? (
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center text-white">Loading...</div>
//           </div>
//         ) : (
//           <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  p-4 pt-12">
//             {Array.isArray(allPublicEvents?.events) &&
//               allPublicEvents?.events.map((event, index) => (
//                 <EventCard
//                   key={index}
//                   openIt={() => handelEventModel(true, event._id)}
//                   eventName={event.title}
//                   date={new Date(event?.startingDate).toLocaleDateString()}
//                   time={new Date(event?.startingDate).toLocaleTimeString()}
//                   place={event.status}
//                   imgSrc={event?.thumbnail}
//                   tag={event?.tag}
//                   noOfHour={event?.duration}
//                   id={event?._id}
//                 />
//               ))}
//           </div>
//         )}

//         {/* Modal */}
//         {state && (
//           <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
//             <div className="min-h-screen px-4 flex items-center justify-center py-8">
//               <EventDetialModel
//                 {...eventData}
//                 closeIt={() => handelEventModel(false)}
//               />
//             </div>
//           </div>
//         )}
//       </Container>
//     </div> */}