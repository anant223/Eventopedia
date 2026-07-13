import {
  BarChart3,
  Calendar,
  Globe,
  MessageSquare,
  Shield,
  Users,
  Video,
  Zap,
  CalendarIcon,
  Settings,
  MessageCircle,
  User,
  LayoutDashboard,
} from "lucide-react";

export const features = [
  {
    id: 1,
    icon: Video,
    title: "HD Streaming",
    description:
      "Crystal clear video quality with adaptive bitrate streaming that adjusts to your audience's connection.",
    highlights: ["4K Support", "Low Latency", "Auto Quality"],
  },
  {
    id: 2,
    icon: Users,
    title: "Unlimited Attendees",
    description:
      "Host events for 10 or 10,000 people. Our infrastructure scales automatically with your audience.",
    highlights: ["No Limits", "Auto Scaling", "Global CDN"],
  },
  {
    id: 3,
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and security protocols keep your events and data completely protected.",
    highlights: ["End-to-End Encryption", "SOC 2 Compliant", "GDPR Ready"],
  },
  {
    id: 4,
    icon: MessageSquare,
    title: "Interactive Chat",
    description:
      "Real-time messaging, polls, Q&A sessions, and reactions to keep your audience engaged.",
    highlights: ["Live Polls", "Q&A Sessions", "Emoji Reactions"],
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Detailed insights into attendance, engagement, and performance metrics for every event.",
    highlights: ["Real-time Data", "Export Reports", "Audience Insights"],
  },
  {
    id: 6,
    icon: Globe,
    title: "Global Reach",
    description:
      "Broadcast to audiences worldwide with our global content delivery network and multi-language support.",
    highlights: ["Multi-language", "Global CDN", "Time Zone Support"],
  },
  {
    id: 7,
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Intelligent scheduling system with calendar integration and automated reminder notifications.",
    highlights: ["Calendar Sync", "Auto Reminders", "Time Zone Detection"],
  },
  {
    id: 8,
    icon: Zap,
    title: "Instant Setup",
    description:
      "Go live in seconds with our one-click streaming technology. No downloads or installations required.",
    highlights: ["Browser-based", "One-click Start", "No Downloads"],
  },
];
export const sidebarMenuItems = [
  { icon: CalendarIcon, label: "Events", href: "/main/all-events" },
  { icon: Users, label: "Leaders", href: "/main/all-orgnizers" },
];
export const quickActions = [
  { icon: User, label: "Profile", color: "from-gray-500 to-gray-600" },
  {
    icon: Settings,
    label: "setting",
    color: "from-[#7f54f6] to-gray-500",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    color: "from-green-500 to-green-600",
  },
];

export const categories = [
  { value: "music", label: "Music", icon: "🎵" },
  { value: "sports", label: "Sports", icon: "⚽" },
  { value: "tech", label: "Tech", icon: "💻" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "arts", label: "Arts", icon: "🎨" },
  { value: "food", label: "Food", icon: "🍕" },
  { value: "networking", label: "Networking", icon: "🤝" },
  { value: "fitness", label: "Fitness", icon: "💪" },
  { value: "health", label: "Health", icon: "🏥" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "entertainment", label: "Entertainment", icon: "🎬" },
  { value: "other", label: "Other", icon: "✨" },
];

export const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Unread", value: "UNREAD" },
  { label: "Events", value: "EVENTS" },
  { label: "Payments", value: "PAYMENTS" },
];

const TYPE_CONFIG = {
  NEW_EVENT: { color: "#6366F1", emoji: "🎉" },
  EVENT_CANCELLED: { color: "#EF4444", emoji: "❌" },
  EVENT_UPDATED: { color: "#F59E0B", emoji: "📝" },
  EVENT_REGISTERED: { color: "#10B981", emoji: "✅" },
  EVENT_INVITED: { color: "#8B5CF6", emoji: "💌" },
  CO_HOST_INVITED: { color: "#EC4899", emoji: "👥" },
  EVENT_REMINDER: { color: "#F59E0B", emoji: "⏰" },
  EVENT_LIKED: { color: "#EC4899", emoji: "❤️" },
  PAYMENT_SUCCEEDED: { color: "#10B981", emoji: "💳" },
  PAYMENT_FAILED: { color: "#EF4444", emoji: "💳" },
  PAYMENT_REFUNDED: { color: "#F59E0B", emoji: "💸" },
  USER_WELCOME: { color: "#6366F1", emoji: "👋" },
  ONBOARDING_COMPLETED: { color: "#10B981", emoji: "🎓" },
  STRIPE_ONBOARDING_COMPLETED: { color: "#6366F1", emoji: "💰" },
};

const formatTime = (date) => {
  const diff = Date.now() - new Date(date);
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const transformNotification = (notif) => ({
  id: notif._id,
  type: notif.type,
  title: notif.title,
  message: notif.message,
  read: notif.isRead,
  time: formatTime(notif.createdAt),
  color: TYPE_CONFIG[notif.type]?.color || "#6B7280",
  avatar: notif.actor?.avatar || TYPE_CONFIG[notif.type]?.emoji || "🔔",
});

export const EVENT_TYPES = [
  "NEW_EVENT",
  "EVENT_REGISTERED",
  "EVENT_UPDATED",
  "EVENT_CANCELLED",
  "EVENT_REMINDER",
  "EVENT_LIKED",
  "EVENT_INVITED",
  "CO_HOST_INVITED",
];

export const PAYMENT_TYPES = [
  "PAYMENT_SUCCEEDED",
  "PAYMENT_FAILED",
  "PAYMENT_REFUNDED",
];

export const getCategoryColor = (category) => {
    const colors = {
        music:        "#8B5CF6",
        art:          "#EC4899",
        sports:       "#10B981",
        tech:         "#378ADD",
        food:         "#F59E0B",
        education:    "#6366F1",
        networking:   "#14B8A6",
        health:       "#EF4444",
        entertainment:"#F97316",
        business:     "#64748B",
    };
    return colors[category?.toLowerCase()] || "#E24B4A";
};

export const getCategoryEmoji = (category) => {
    const emojis = {
        music:        "🎵",
        art:          "🎨",
        sports:       "🏃",
        tech:         "💻",
        food:         "🍕",
        education:    "📚",
        networking:   "🤝",
        health:       "💪",
        entertainment:"🎭",
        business:     "💼",
    };
    return emojis[category?.toLowerCase()] || "📍";
};