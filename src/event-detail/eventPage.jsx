

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/PageShell";
import { MoveLeft } from "lucide-react";
import { BodyContainer } from "@/components/containers/Container";


// ─── helpers ──────────────────────────────────────────────────────────────────

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

const isSameDay = (a, b) =>
  new Date(a).toDateString() === new Date(b).toDateString();

const isPast = (d) => new Date(d) < new Date();
const isUpcoming = (d) => new Date(d) > new Date();

const categoryDot = {
  tech: "#185FA5",
  business: "#BA7517",
  health: "#0F6E56",
  education: "#534AB7",
  entertainment: "#A32D2D",
  sports: "#3B6D11",
  other: "#9b9890",
};

// ─── icons ────────────────────────────────────────────────────────────────────

const PinIcon = () => (
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
    <path d="M8 2C5.2 2 3 4.2 3 7c0 3.5 5 8 5 8s5-4.5 5-8c0-2.8-2.2-5-5-5z" />
    <circle cx="8" cy="7" r="1.5" />
  </svg>
);

const CalIcon = () => (
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
    <rect x="2" y="3" width="12" height="11" rx="2" />
    <path d="M2 7h12M5 1v3M11 1v3" />
  </svg>
);

const TicketIcon = () => (
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
    <rect x="1.5" y="4" width="13" height="9" rx="1.5" />
    <path d="M1.5 7.5h13" />
  </svg>
);

const ShareIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M6 9l4 2.5M10 4.5L6 7" />
  </svg>
);

const DotsIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="4" cy="8" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

// ─── top icon button ──────────────────────────────────────────────────────────

const IconBtn = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white cursor-pointer"
  >
    {children}
  </button>
);

// ─── meta row ─────────────────────────────────────────────────────────────────

const MetaRow = ({ icon, children, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      "flex items-center gap-2.5 text-[13px] text-[#6b6966]",
      onClick && "cursor-pointer hover:text-[#1a1814] transition-colors"
    )}
  >
    <span className="text-[#9b9890] shrink-0">{icon}</span>
    {children}
  </div>
);

// ─── cancel confirm ───────────────────────────────────────────────────────────

const CancelConfirm = ({ onConfirm, onDismiss }) => (
  <div className="bg-[#FCEBEB] border border-red-100 rounded-2xl p-4 mb-3">
    <p className="text-[13px] font-medium text-[#A32D2D] mb-1">
      Cancel this event?
    </p>
    <p className="text-[12px] text-[#791F1F] leading-relaxed mb-3">
      All attendees will be notified. This cannot be undone.
    </p>
    <div className="flex gap-2">
      <Button
        onClick={onConfirm}
        className="flex-1 h-9 rounded-xl bg-[#D85A30] text-white text-[12px] font-medium hover:bg-[#D85A30]/90 border-none"
      >
        Yes, cancel
      </Button>
      <Button
        variant="outline"
        onClick={onDismiss}
        className="flex-1 h-9 rounded-xl border-black/15 text-[#1a1814] text-[12px] font-medium bg-white"
      >
        Keep it
      </Button>
    </div>
  </div>
);

// ─── main ─────────────────────────────────────────────────────────────────────

/**
 * EventPage
 *
 * Props:
 *   event         — populated event doc
 *   organizer     — populated User (organizerId)
 *   attendees     — array of populated users who RSVP'd (for avatar stack)
 *   attendeeCount — total count
 *   currentUser   — logged-in user
 *   onRSVP        — () => Promise<void>
 *   onCancel      — () => Promise<void>
 *   rsvpLoading   — boolean
 */

const fakeEvent = {
  _id: "67c8a3b2f1e2d4a5b6c7d8e9",
  title: "Neon Nights: Electronic Music Festival 2026",
  desc: "Experience the ultimate electronic music festival featuring world-class DJs, stunning visual effects, and an unforgettable atmosphere. Join thousands of music lovers for a night of pure energy and euphoria. Special guests include international headliners and local talent. The event will feature 3 stages, immersive art installations, and premium food vendors.",
  image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=600&fit=crop",
  category: "entertainment",
  startDateTime: new Date("2026-12-15T18:00:00Z"),
  endDateTime: new Date("2026-12-16T04:00:00Z"),
  location: {
    address: "Warehouse 47, 123 Electric Avenue, Brooklyn, NY 11222",
    lat: 40.7128,
    lng: -74.0060,
  },
  locationId: "wh47_bk_nyc",
  totalTickets: 2500,
  availableTickets: 847,
  tags: ["music", "festival", "edm", "dj", "nightlife", "electronic", "dance", "concert"],
  hosts: [
    {
      userId: "user_67c8a3b2f1e2d4a5b6c7d8e1",
      status: "accepted",
      invitedAt: new Date("2026-10-01T10:00:00Z"),
      respondedAt: new Date("2026-10-02T14:30:00Z"),
    },
    {
      userId: "user_67c8a3b2f1e2d4a5b6c7d8e2",
      status: "accepted",
      invitedAt: new Date("2026-10-01T10:00:00Z"),
      respondedAt: new Date("2026-10-03T09:15:00Z"),
    },
    {
      userId: "user_67c8a3b2f1e2d4a5b6c7d8e3",
      status: "pending",
      invitedAt: new Date("2026-10-05T11:00:00Z"),
      respondedAt: null,
    },
  ],
  organizerId: "user_67c8a3b2f1e2d4a5b6c7d8e0",
  eventType: "public",
  invitedUsers: [
    {
      userId: "user_67c8a3b2f1e2d4a5b6c7d8e4",
      status: "accepted",
      invitedAt: new Date("2026-11-01T09:00:00Z"),
      respondedAt: new Date("2026-11-02T15:20:00Z"),
    },
    {
      userId: "user_67c8a3b2f1e2d4a5b6c7d8e5",
      status: "pending",
      invitedAt: new Date("2026-11-01T09:00:00Z"),
      respondedAt: null,
    },
  ],
  ticketType: "paid",
  price: 89.99,
  currency: "USD",
  requireApproval: false,
  token: "evt_token_abc123xyz789",
  status: "active",
  createdAt: new Date("2026-10-01T08:00:00Z"),
  updatedAt: new Date("2026-12-01T12:00:00Z"),
};

// Additional featured events
const featuredEvents = [
  {
    _id: "67c8a3b2f1e2d4a5b6c7d8f1",
    title: "Sunset Jazz & Chill",
    desc: "Relax with smooth jazz by the waterfront",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=300&fit=crop",
    category: "entertainment",
    startDateTime: new Date("2026-12-20T17:00:00Z"),
    endDateTime: new Date("2026-12-20T22:00:00Z"),
    location: {
      address: "Harbor Park, 1 Waterfront Plaza, Miami, FL 33131",
      lat: 25.7617,
      lng: -80.1918,
    },
    totalTickets: 500,
    availableTickets: 132,
    tags: ["jazz", "music", "chill", "sunset", "outdoor"],
    ticketType: "paid",
    price: 45,
    currency: "USD",
    status: "active",
  },
  {
    _id: "67c8a3b2f1e2d4a5b6c7d8f2",
    title: "Tech Innovators Summit 2026",
    desc: "Annual gathering of tech leaders and innovators",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "tech",
    startDateTime: new Date("2026-12-10T09:00:00Z"),
    endDateTime: new Date("2026-12-12T18:00:00Z"),
    location: {
      address: "Convention Center, 500 Howard St, San Francisco, CA 94105",
      lat: 37.7749,
      lng: -122.4194,
    },
    totalTickets: 3000,
    availableTickets: 1245,
    tags: ["tech", "conference", "networking", "innovation", "ai"],
    ticketType: "paid",
    price: 299,
    currency: "USD",
    status: "active",
  },
  {
    _id: "67c8a3b2f1e2d4a5b6c7d8f3",
    title: "Wellness & Yoga Retreat",
    desc: "Rejuvenate your mind and body",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "health",
    startDateTime: new Date("2026-12-05T08:00:00Z"),
    endDateTime: new Date("2026-12-07T20:00:00Z"),
    location: {
      address: "Mountain View Resort, 100 Serenity Ln, Boulder, CO 80302",
      lat: 40.0150,
      lng: -105.2705,
    },
    totalTickets: 200,
    availableTickets: 78,
    tags: ["yoga", "wellness", "meditation", "health", "retreat"],
    ticketType: "paid",
    price: 499,
    currency: "USD",
    status: "active",
  },
];

// Free event example
const freeEvent = {
  _id: "67c8a3b2f1e2d4a5b6c7d8f4",
  title: "Community Art Exhibition",
  desc: "Local artists showcase their work. Free admission, donations welcome.",
  image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=400&fit=crop",
  category: "entertainment",
  startDateTime: new Date("2026-12-18T11:00:00Z"),
  endDateTime: new Date("2026-12-18T19:00:00Z"),
  location: {
    address: "Community Arts Center, 450 Main St, Austin, TX 78701",
    lat: 30.2672,
    lng: -97.7431,
  },
  totalTickets: null, // Free events don't require totalTickets
  availableTickets: null,
  tags: ["art", "exhibition", "community", "free", "culture"],
  hosts: [],
  organizerId: "user_67c8a3b2f1e2d4a5b6c7d8e6",
  eventType: "public",
  invitedUsers: [],
  ticketType: "free",
  price: 0,
  currency: "USD",
  requireApproval: false,
  status: "active",
  createdAt: new Date("2026-11-15T10:00:00Z"),
  updatedAt: new Date("2026-12-01T09:00:00Z"),
};

// Private event example
const privateEvent = {
  _id: "67c8a3b2f1e2d4a5b6c7d8f5",
  title: "VIP Networking Gala",
  desc: "Exclusive invitation-only gala for industry leaders",
  image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
  category: "business",
  startDateTime: new Date("2026-12-25T19:00:00Z"),
  endDateTime: new Date("2026-12-26T01:00:00Z"),
  location: {
    address: "The Ritz-Carlton, 1 Hotel Dr, New York, NY 10001",
    lat: 40.7580,
    lng: -73.9855,
  },
  totalTickets: 150,
  availableTickets: 150,
  tags: ["networking", "exclusive", "gala", "business", "vip"],
  hosts: [],
  organizerId: "user_67c8a3b2f1e2d4a5b6c7d8e7",
  eventType: "private", // Private event
  invitedUsers: [
    {
      userId: "user_67c8a3b2f1e2d4a5b6c7d8e8",
      status: "accepted",
      invitedAt: new Date("2026-12-01T10:00:00Z"),
      respondedAt: new Date("2026-12-02T14:00:00Z"),
    },
  ],
  ticketType: "paid",
  price: 1000,
  currency: "USD",
  requireApproval: true, // Requires approval
  token: "private_evt_token_xyz",
  status: "draft",
  createdAt: new Date("2026-11-20T08:00:00Z"),
  updatedAt: new Date("2026-12-05T12:00:00Z"),
};

// Export all fake data
export const fakeEvents = {
  mainEvent: fakeEvent,
  featuredEvents: featuredEvents,
  freeEvent: freeEvent,
  privateEvent: privateEvent,
  allEvents: [fakeEvent, ...featuredEvents, freeEvent, privateEvent],
};

// Helper function to get event status display
export const getEventStatusDisplay = (status) => {
  const statusMap = {
    draft: { label: "Draft", color: "bg-yellow-500/10 text-yellow-500", icon: AlertCircle },
    active: { label: "Active", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
    cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-500", icon: XCircle },
    completed: { label: "Completed", color: "bg-gray-500/10 text-gray-400", icon: CheckCircle },
  };
  return statusMap[status] || statusMap.draft;
};

// Helper function to format date range
export const formatEventDateRange = (startDateTime, endDateTime) => {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const startFormatted = format(start, "MMM d, yyyy • h:mm a");
  const endFormatted = format(end, "h:mm a");
  return `${startFormatted} - ${endFormatted}`;
};

// Helper function to get ticket availability status
export const getTicketStatus = (availableTickets, totalTickets) => {
  if (!availableTickets || availableTickets === 0) {
    return { label: "Sold Out", color: "text-red-400", variant: "destructive" };
  }
  if (availableTickets < totalTickets * 0.1) {
    return { label: "Almost Gone", color: "text-orange-400", variant: "warning" };
  }
  if (availableTickets < totalTickets * 0.3) {
    return { label: "Limited", color: "text-yellow-400", variant: "caution" };
  }
  return { label: "Available", color: "text-green-400", variant: "success" };
};

const EventPage = ({
  event = {},
  organizer = {},
  attendees = [],
  attendeeCount = 0,
  currentUser = {},
  onRSVP,
  onCancel,
  rsvpLoading = false,
}) => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  
  // free 
  const id = fakeEvent?._id
  const title = fakeEvent?.title
  const image = fakeEvent?.image
  const desc = fakeEvent?.desc
  const type = fakeEvent?.eventType
  const ticket = fakeEvent?.ticketType
  const hosts = fakeEvent?.hosts
  const organiser = fakeEvent?.organizerId

  const isOwn =
    currentUser?._id === (event.organizerId?._id ?? event.organizerId);
  const dotColor = categoryDot[event.category] ?? categoryDot.other;
  const cancelled = event.status === "cancelled";
  const draft = event.status === "draft";
  const past = isPast(event.endDateTime);
  const isPaid = event.ticketType === "paid";
  const soldOut = event.availableTickets === 0;
  const acceptedHosts = (event.hosts ?? []).filter(
    (h) => h.status === "accepted"
  );

  // date string
  const dateStr = event.startDateTime
    ? isSameDay(event.startDateTime, event.endDateTime)
      ? `${fmtDate(event.startDateTime)}, ${fmtTime(event.startDateTime)}`
      : `${fmtDate(event.startDateTime)} – ${fmtDate(event.endDateTime)}`
    : "Date TBA";

  // ticket string
  const ticketStr = isPaid
    ? `${event.currency} ${event.price}${event.availableTickets != null ? ` · ${event.availableTickets} remaining` : ""}`
    : `Free event${event.availableTickets != null ? ` · ${event.availableTickets} spots left` : ""}`;

  // rsvp button
  const rsvpLabel = () => {
    if (cancelled) return "Cancelled";
    if (past) return "Event ended";
    if (soldOut) return "Sold out";
    if (rsvpLoading) return "Processing…";
    if (isPaid) return `Get ticket · ${event.currency} ${event.price}`;
    return "RSVP";
  };

  const rsvpDisabled = cancelled || past || soldOut || rsvpLoading;

  return (
    <div>
      <BodyContainer className=" pb-48 flex flex-col gap-4 pt-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1 text-[#1a1814] flex items-center gap-1.5"
          >
            <MoveLeft className="w-3.5 h-3.5" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {cancelled && (
              <span className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#FCEBEB] text-[#A32D2D]">
                Cancelled
              </span>
            )}
            {draft && (
              <span className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#FAEEDA] text-[#BA7517]">
                Draft
              </span>
            )}
            <button
              type="button"
              onClick={() => {}}
              className="p-1 text-[#1a1814]"
            >
              <DotsIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="p-1 text-[#1a1814]"
            >
              <ShareIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden rounded-xl">
          {image ? (
            <img
              src={image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a2a4a] to-[#2d5a4a]" />
          )}
        </div>

        {/* ── body ── */}
        {/* title + category badge */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-[26px] sm:text-[30px] font-medium text-[#1a1814] leading-tight tracking-tight flex-1">
            {title}
          </h1>
          <div className="flex items-center gap-1.5 bg-white border border-black/[0.09] rounded-full px-3 py-1.5 shrink-0 mt-1">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: dotColor }}
            />
            <span className="text-[12px] font-medium text-[#1a1814] capitalize">
              {fakeEvent.category ?? "other"}
            </span>
          </div>
        </div>
        {/* meta rows — exactly like reference */}
        <div className="flex flex-col gap-3">
          {fakeEvent?.location?.address && (
            <MetaRow
              icon={<PinIcon />}
              onClick={
                fakeEvent.location?.lat
                  ? () =>
                      window.open(
                        `https://maps.google.com/?q=${fakeEvent.location.lat},${fakeEvent.location.lng}`,
                        "_blank"
                      )
                  : undefined
              }
            >
              {fakeEvent.location.address}
            </MetaRow>
          )}
          <MetaRow icon={<CalIcon />}>{dateStr}</MetaRow>
          <MetaRow icon={<TicketIcon />}>{ticketStr}</MetaRow>
          {fakeEvent.requireApproval && (
            <p className="text-[12px] text-[#9b9890] pl-[22px]">
              Attendance requires organiser approval
            </p>
          )}
        </div>
        {/* attendee avatar stack */}
        {(fakeEvent.attendeeCount > 0 || attendees.length > 0) && (
          <div className="flex items-center gap-2.5">
            <div className="flex">
              {fakeEvent.invitedUsers.slice(0, 4).map((u, i) => (
                <Avatar
                  key={u?.userId ?? i}
                  className="w-7 h-7 border-2 border-[#f0ede6]"
                  style={{ marginLeft: i === 0 ? 0 : -8 }}
                >
                  <AvatarImage src={u?.avatar} />
                  <AvatarFallback className="text-[9px] bg-[#1a1814] text-[#f2eee7]">
                    {u.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-[13px] text-[#6b6966]">
              {attendeeCount} {attendeeCount === 1 ? "person" : "people"} going
            </span>
          </div>
        )}
        <div className="h-px bg-black/[0.07]" />
        {/* description */}
        {fakeEvent.desc && (
          <div>
            <div
              className={cn(
                "text-[14px] text-[#6b6966] leading-[1.75]",
                "[&_strong]:font-medium [&_strong]:text-[#1a1814]",
                "[&_h1]:text-[17px] [&_h1]:font-medium [&_h1]:text-[#1a1814] [&_h1]:mb-1",
                "[&_h2]:text-[15px] [&_h2]:font-medium [&_h2]:text-[#1a1814] [&_h2]:mb-1",
                "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1",
                "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1",
                !showMore && "line-clamp-4"
              )}
              dangerouslySetInnerHTML={{ __html: fakeEvent.desc }}
            />
            {fakeEvent.desc.replace(/<[^>]*>/g, "").trim().length > 160 && (
              <button
                type="button"
                onClick={() => setShowMore((p) => !p)}
                className="text-[13px] font-medium text-[#1a1814] bg-transparent border-none cursor-pointer p-0 mt-1.5"
              >
                {showMore ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}
        {/* tags */}
        {fakeEvent.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fakeEvent.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-[#9b9890] bg-white border border-black/[0.08] rounded-full px-3 py-1.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* co-hosts */}
        {fakeEvent.hosts.length > 0 && (
          <>
            <div className="h-px bg-black/[0.07]" />
            <div className="flex flex-wrap gap-2">
              {fakeEvent.hosts.map((h) => (
                <div
                  key={h.userId}
                  className="flex items-center gap-2 bg-white border border-black/[0.08] rounded-full pl-1.5 pr-3 py-1"
                >
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={h.userId?.avatar} />
                    <AvatarFallback className="text-[9px] bg-[#1a1814] text-[#f2eee7]">
                      {h.userId?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[12px] font-medium text-[#1a1814]">
                    {h.userId?.name ?? h.userId?.username}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {/* owner stats */}
        {fakeEvent.organizerId && (
          <>
            <div className="h-px bg-black/[0.07]" />
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  val:
                    (fakeEvent.totalTickets ?? 0) - (fakeEvent.availableTickets ?? 0),
                  label: "RSVPs",
                },
                { val: fakeEvent.availableTickets ?? "∞", label: "Remaining" },
                { val: acceptedHosts.length, label: "Co-hosts" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="bg-white border border-black/[0.08] rounded-2xl p-4 text-center"
                >
                  <p className="text-[22px] font-medium text-[#1a1814]">
                    {val}
                  </p>
                  <p className="text-[11px] text-[#9b9890] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {/* owner cancel confirm */}
        {showCancel && (
          <CancelConfirm
            onConfirm={onCancel}
            onDismiss={() => setShowCancel(false)}
          />
        )}
      </BodyContainer>
      {/* ── sticky bottom RSVP ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div
          className="max-w-2xl mx-auto px-4 pb-6 pt-8 pointer-events-auto"
          style={{
            background: "linear-gradient(to top, #f0ede6 70%, transparent)",
          }}
        >
          {!isOwn ? (
            <button
              type="button"
              onClick={rsvpDisabled ? undefined : onRSVP}
              disabled={rsvpDisabled}
              className={cn(
                "w-full py-4 rounded-2xl text-[14px] font-semibold border-none transition-all",
                rsvpDisabled
                  ? "bg-[#e8e4dc] text-[#9b9890] cursor-not-allowed"
                  : "bg-[#1a1814] text-[#f2eee7] cursor-pointer hover:bg-[#1a1814]/90"
              )}
            >
              {rsvpLabel()}
            </button>
          ) : (
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => navigate(`/events/${event._id}/edit`)}
                className="flex-1 py-4 rounded-2xl text-[13px] font-medium bg-white border border-black/15 text-[#1a1814] cursor-pointer hover:bg-[#f8f7f5] transition-colors"
              >
                Edit event
              </button>
              {!cancelled && !past && (
                <button
                  type="button"
                  onClick={() => setShowCancel((p) => !p)}
                  className="flex-1 py-4 rounded-2xl text-[13px] font-medium bg-transparent border border-[#D85A30]/30 text-[#D85A30] cursor-pointer hover:bg-[#FCEBEB] transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
