import {
  Calendar,
  MessageCircle,
  Users,
  Video,
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
const howitwork = [
  {
    step: 1,
    title: "Sign Up",
    description: "Create your account and set up your profile.",
  },
  {
    step: 2,
    title: "Choose Your Event",
    description: "Select a group meeting or request individual help.",
  },
  {
    step: 3,
    title: "Connect and Learn",
    description: "Join your event and start collaborating!",
  },
];


export { features, howitwork, };
