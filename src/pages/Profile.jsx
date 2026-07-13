import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageShell } from "@/components/layout/PageShell";
import useAuth from "@/hooks/useAuth";
import { BodyContainer } from "@/components/containers/Container";

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

const categoryBg = {
  music: "#FAECE7",
  sports: "#E1F5EE",
  tech: "#E6F1FB",
  business: "#FAEEDA",
  arts: "#FBEAF0",
  food: "#EAF3DE",
  networking: "#EEEDFE",
  fitness: "#E1F5EE",
  health: "#E6F1FB",
  education: "#EEEDFE",
  entertainment: "#FAECE7",
  other: "#F1EFE8",
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
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[platform] ?? paths.other}
    </svg>
  );
};

// ─── stat card ────────────────────────────────────────────────────────────────

const StatCard = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="flex-1 bg-white border border-[#e8e4dc] rounded-2xl p-3 sm:p-4 text-center hover:border-[#c8c4bc] hover:shadow-sm transition-all duration-200"
  >
    <p
      className="text-xl sm:text-2xl font-semibold text-[#1a1814] leading-none mb-1.5"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {value}
    </p>
    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#a8a49c]">
      {label}
    </p>
  </motion.div>
);

// ─── interest chip ────────────────────────────────────────────────────────────

const InterestChip = ({ label, active }) => (
  <span
    className={cn(
      "inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-150 cursor-default",
      active
        ? "text-[#1a1814] border-[#1a1814]/20"
        : "bg-transparent text-[#a8a49c] border-[#e8e4dc]"
    )}
    style={
      active
        ? {
            background: categoryBg[label] ?? "#f2eee7",
            borderColor: categoryColor[label]
              ? `${categoryColor[label]}30`
              : "#e8e4dc",
            color: categoryColor[label] ?? "#1a1814",
          }
        : {}
    }
  >
    {label}
  </span>
);

// ─── event row ────────────────────────────────────────────────────────────────

const EventRow = ({ event, isLast }) => {
  const isUpcoming = event.date && new Date(event.date) > new Date();
  const color = categoryColor[event.category] ?? "#888780";
  const bg = categoryBg[event.category] ?? "#F1EFE8";

  return (
    <>
      <div className="flex items-center gap-3.5 py-3.5 px-4 hover:bg-[#faf8f4] transition-colors duration-150">
        <div className="relative flex-shrink-0">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[#1a1814] truncate leading-tight">
            {event.title}
          </p>
          <p className="text-[11px] text-[#a8a49c] mt-0.5 leading-tight">
            {event.date ? fmt(event.date) : ""}
            {event.location?.city ? ` · ${event.location.city}` : ""}
          </p>
        </div>
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 uppercase tracking-wide"
          style={
            isUpcoming
              ? { background: "#EAF3DE", color: "#3B6D11" }
              : { background: bg, color }
          }
        >
          {isUpcoming ? "Soon" : "Past"}
        </span>
      </div>
      {!isLast && <div className="h-px bg-[#f0ece4] mx-4" />}
    </>
  );
};

// ─── section label ────────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#b0aba3] mb-3">
    {children}
  </p>
);

// ─── main component ───────────────────────────────────────────────────────────

const UserProfile = ({
  isOwn = false,
  organizedEvents = [],
  attendedCount = 0,
  followersCount = 0,
  onFollow,
  onUnfollow,
  isFollowing = false,
}) => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(isFollowing);
  const { user } = useAuth();

  const name = user.name ?? "Anant";
  const username = user.username ?? "anant";
  const bio = user.bio ?? "";
  const city = user.location?.city ?? "";
  const country = user.location?.country ?? "";
  const joined = user.createdAt ? fmt(user.createdAt) : "";
  const stripeOk = user.stripeOnboardingCompleted ?? false;
  const preferred = new Set(user.preferredCategories ?? []);
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
  const activeSocials = (user.socialLinks ?? []).filter((l) => l.url);

  const handleFollow = () => {
    setFollowing((f) => !f);
    following ? onUnfollow?.() : onFollow?.();
  };

  return (
    <PageShell>
      {/* ── cover ─────────────────────────────────────────────────────────── */}
      
      <div
        className="relative h-36 sm:h-44 overflow-hidden"
        style={{ background: "#1a1814" }}
      >
        {/* texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f2eee7 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* warm gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,83,126,0.12) 0%, rgba(186,117,23,0.08) 50%, rgba(55,138,221,0.1) 100%)",
          }}
        />

        {/* back button — aligned to Container */}
        <div className="absolute top-4 inset-x-0">
          <BodyContainer>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white/90 bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer backdrop-blur-sm transition-all duration-150"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 3L5 8l5 5" />
              </svg>
              Back
            </button>
          </BodyContainer>
        </div>
      </div>
      {/* ── avatar row — sits between cover and content, aligned to Container ─ */}
      <div className="relative bg-[#f5f1ea]">
        <BodyContainer>
          <div className="flex items-end justify-between -translate-y-10">
            {/* avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-[3px] border-[#f5f1ea] shadow-md">
                <AvatarImage src={user.avatar} alt={name} />
                <AvatarFallback
                  className="text-[22px] font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #f2eee7, #e8e0d0)",
                    color: "#1a1814",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {name?.[0]?.toUpperCase() ?? "A"}
                </AvatarFallback>
              </Avatar>
              {stripeOk && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-[#f5f1ea] flex items-center justify-center"
                  style={{ background: "#1D9E75" }}
                  title="Stripe connected"
                >
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>

            {/* CTA button — elevated alongside avatar so it doesn't shift layout below */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-1"
            >
              {isOwn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/settings")}
                  className="rounded-full text-[12px] font-medium border-[#d8d4cc] text-[#4a4744] h-8 px-4 hover:bg-[#f5f1ea] hover:border-[#c0bbb3] transition-all bg-white"
                >
                  Edit profile
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleFollow}
                  className={cn(
                    "rounded-full text-[12px] font-medium h-8 px-4 transition-all duration-200",
                    following
                      ? "bg-transparent text-[#4a4744] border border-[#d8d4cc] hover:bg-[#f5f1ea]"
                      : "bg-[#1a1814] text-[#f2eee7] hover:bg-[#2d2925] shadow-sm"
                  )}
                >
                  {following ? "Following" : "Follow"}
                </Button>
              )}
            </motion.div>
          </div>
        </BodyContainer>
      </div>

      <BodyContainer className="pb-24">
        {/* ── name ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3"
        >
          <h1
            className="text-xl sm:text-[22px] font-semibold text-[#1a1814] capitalize leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {name}
          </h1>
          <p className="text-[12px] text-[#a8a49c] mt-0.5 font-mono tracking-wide">
            @{username}
          </p>
        </motion.div>

        {/* ── bio ─────────────────────────────────────────────────────────── */}
        {bio && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="text-[13px] text-[#6b6966] leading-relaxed mb-4"
          >
            {bio}
          </motion.p>
        )}

        {/* ── meta ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {(city || country) && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#a8a49c]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2C5.2 2 3 4.2 3 7c0 3.5 5 8 5 8s5-4.5 5-8c0-2.8-2.2-5-5-5z" />
                <circle cx="8" cy="7" r="1.5" />
              </svg>
              {[city, country].filter(Boolean).join(", ")}
            </div>
          )}
          {joined && (
            <div className="flex items-center gap-1.5 text-[12px] text-[#a8a49c]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="12" height="11" rx="2" />
                <path d="M5 1v3M11 1v3M2 7h12" />
              </svg>
              Joined {joined}
            </div>
          )}
        </motion.div>

        {/* ── stats ───────────────────────────────────────────────────────── */}
        <div className="flex gap-2 sm:gap-3 mb-8">
          <StatCard
            value={organizedEvents.length}
            label="Organised"
            delay={0.16}
          />
          <StatCard value={attendedCount} label="Attended" delay={0.2} />
          <StatCard value={followersCount} label="Followers" delay={0.24} />
        </div>

        {/* ── interests ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7"
        >
          <SectionLabel>Interests</SectionLabel>
          <div className="bg-white border border-[#ece8e0] rounded-2xl p-4 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <InterestChip key={cat} label={cat} active={preferred.has(cat)} />
            ))}
          </div>
        </motion.div>

        {/* ── organised events ────────────────────────────────────────────── */}
        {organizedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7"
          >
            <SectionLabel>Events organised</SectionLabel>
            <div className="bg-white border border-[#ece8e0] rounded-2xl overflow-hidden">
              {organizedEvents.slice(0, 5).map((ev, i, arr) => (
                <EventRow
                  key={ev._id ?? i}
                  event={ev}
                  isLast={i === arr.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── social links ────────────────────────────────────────────────── */}
        {activeSocials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>Elsewhere</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {activeSocials.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.platform}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-[#ece8e0] rounded-xl text-[#a8a49c] no-underline hover:bg-[#f5f1ea] hover:text-[#1a1814] hover:border-[#d0ccc4] transition-all duration-150"
                >
                  <PlatformIcon platform={link.platform} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </BodyContainer>
    </PageShell>
  );
};

export default UserProfile;
