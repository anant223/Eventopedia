import { Container } from "@/components/containers";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";


// ─── helpers ──────────────────────────────────────────────────────────────────

const fmt = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

const categoryColor = {
  music: "#D85A30",
  sports: "#1D9E75",
  tech: "#378ADD",
  business: "#BA7517",
  arts: "#D4537E",
  food: "#639922",
  networking: "#7F77DD",
  fitness: "#0F6E56",
  health: "#185FA5",
  education: "#534AB7",
  entertainment: "#993C1D",
  other: "#888780",
};

// ─── platform icons ───────────────────────────────────────────────────────────

const PlatformIcon = ({ platform }) => {
  const paths = {
    twitter: (
      <path d="M13 2L9 7l4.5 7H11L8 9.5 4.5 14H2l4-5.5L1 2h2.5L7 6.2 10.5 2H13z" />
    ),
    linkedin: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="2.5" />
        <path d="M5.5 7v4M5.5 5.5v.01M8 11V8.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V11" />
      </>
    ),
    instagram: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="3.5" />
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="11.5" cy="4.5" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
    youtube: (
      <>
        <rect x="1" y="3.5" width="14" height="9" rx="2.5" />
        <path d="M6.5 6l4 2.5-4 2.5V6z" fill="currentColor" stroke="none" />
      </>
    ),
    discord: (
      <>
        <path d="M11 3s1.5.5 2.5 3.5c0 0 .5 3-.5 5-.5.5-2 1.5-2 1.5l-1-2c.5-.2 1-.5 1.5-1M5 3S3.5 3.5 2.5 6.5c0 0-.5 3 .5 5 .5.5 2 1.5 2 1.5l1-2c-.5-.2-1-.5-1.5-1" />
      </>
    ),
    other: (
      <>
        <path d="M7 9a3 3 0 0 0 4.5.3l1.5-1.5a3 3 0 0 0-4.2-4.2L7.5 4.8" />
        <path d="M9 7a3 3 0 0 0-4.5-.3L3 8.2a3 3 0 0 0 4.2 4.2l1.3-1.2" />
      </>
    ),
  };
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[platform] ?? paths.other}
    </svg>
  );
};

// ─── stat card ────────────────────────────────────────────────────────────────

const StatCard = ({ value, label }) => (
  <div className="flex-1 bg-white border border-black/[0.08] rounded-2xl p-4 text-center">
    <p className="text-[22px] font-medium text-[#1a1814] leading-none mb-1">
      {value}
    </p>
    <p className="text-[11px] text-[#9b9890] tracking-wide">{label}</p>
  </div>
);

// ─── interest chip ────────────────────────────────────────────────────────────

const InterestChip = ({ label, active }) => (
  <span
    className={cn(
      "inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors",
      active
        ? "bg-[#1a1814] text-[#f2eee7] border-[#1a1814]"
        : "bg-transparent text-[#6b6966] border-black/12"
    )}
  >
    {label}
  </span>
);

// ─── event row ────────────────────────────────────────────────────────────────

const EventRow = ({ event, isLast }) => {
  const isUpcoming = event.date && new Date(event.date) > new Date();
  return (
    <>
      <div className="flex items-center gap-3 py-3 px-4">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: categoryColor[event.category] ?? "#888780" }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[#1a1814] truncate">
            {event.title}
          </p>
          <p className="text-[11px] text-[#9b9890] mt-0.5">
            {event.date ? fmt(event.date) : ""}
            {event.location?.city ? ` · ${event.location.city}` : ""}
          </p>
        </div>
        <span
          className={cn(
            "text-[10px] font-medium px-2.5 py-1 rounded-lg flex-shrink-0",
            isUpcoming
              ? "bg-[#EAF3DE] text-[#3B6D11]"
              : "bg-[#E6F1FB] text-[#185FA5]"
          )}
        >
          {isUpcoming ? "Upcoming" : "Past"}
        </span>
      </div>
      {!isLast && <Separator className="ml-9" />}
    </>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const { user, userHistory } = useAuth();

  const isOwn = false;
  const attendedCount = 0;
  const followersCount = 0;

  const organizedEvents = userHistory?.organized;
  console.log(organizedEvents)
  const name = user?.name;
  const username = user?.username;
  const avatar = user?.avatar;
  const bio = user?.bio;
  const city = user?.location?.city;
  const country = user?.location?.country;
  const joined = fmt(user.createdAt);
  const stripeOk = user?.stripeOnboardingCompleted;

  console.log(user)

  // preferredCategories used as "interests" chips
  const allCategories = [
    "music",
    "sports",
    "tech",
    "business",
    "arts",
    "food",
    "networking",
    "fitness",
    "health",
    "education",
    "entertainment",
    "other",
  ];
  const preferred = new Set(user.preferredCategories ?? []);

  // socialLinks — only show ones with a URL
  const activeSocials = (user.socialLinks ?? []).filter((l) => l.url);

  // split organised events into upcoming vs past
  const now = Date.now();
  const toStatus = (ev) =>
    ev.date && new Date(ev.date).getTime() > now ? "upcoming" : "past";

  const handleFollow = () => {}
  return (
    <>
      <div>

      </div>
    </>
  );
};

export default ProfilePage;