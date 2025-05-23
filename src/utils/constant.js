import {
  Calendar,
  MessageCircle,
  Users,
  Video,
  HomeIcon,
  CalendarIcon,
  UserIcon,
  PlusCircleIcon,
  CloudCog,
  icons,
  Zap,
  CheckCircle,
  Settings,
} from "lucide-react";


const features = [
  {
    icon: Users,
    title: "Group Meetings",
    description:
      "Organize and participate in dynamic group discussions and workshops.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: MessageCircle,
    title: "One-on-One Chat",
    description: "Get personalized help through our real-time chat feature.",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: Video,
    title: "Video Consultations",
    description: "Face-to-face interactions for in-depth problem-solving.",
    color: "from-yellow-400 to-orange-600",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Find the perfect time with our intuitive scheduling tool.",
    color: "from-pink-400 to-rose-600",
  },
];


const allEvents = [
  {
    name: "Tech Conference 2023",
    date: "2023-10-15",
    attendees: 75,
    status: "Upcoming",
  },
  {
    name: "Product Launch",
    date: "2023-09-30",
    attendees: 120,
    status: "Completed",
  },
  {
    name: "Team Building Workshop",
    date: "2023-11-05",
    attendees: 30,
    status: "Upcoming",
  },
];

const sidebarMenuItems = [
  { icon: CalendarIcon, label: "Events", href: "/main/all-events" },
  { icon: Users, label: "Leaders", href: "/main/all-orgnizers" },
];





export { features, sidebarMenuItems};

