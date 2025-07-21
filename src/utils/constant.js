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
