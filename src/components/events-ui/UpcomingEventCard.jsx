import { current } from "@reduxjs/toolkit";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEventCard = ({ event, isLeft }) => {
  const navigate = useNavigate()
  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30"></div>
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
        </div>
      </div>

      {/* Event Card */}
      <div
        className={`lg:grid lg:grid-cols-2 lg:gap-8 ${
          isLeft ? "" : "lg:grid-flow-dense"
        }`}
      >
        {/* Date Badge - Desktop */}
        <div
          className={`hidden lg:flex ${
            isLeft ? "justify-end" : "lg:col-start-2 justify-start"
          } items-start pt-4`}
        >
          <div className="text-right">
            <div className="inline-flex flex-col items-center bg-card border border-border rounded-xl px-6 py-4 shadow-lg">
              <div className="text-primary text-sm font-semibold uppercase tracking-wide">
                {new Date(event.startDateTime).getMonth()}
              </div>
              <div className="text-5xl font-bold text-foreground my-2">
                {new Date(event.startDateTime).getDate}
              </div>
              <div className="text-muted-foreground text-xs uppercase">
                {event.day}
              </div>
              <div className="text-primary text-sm font-medium mt-2 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {event.time}
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className={`${isLeft ? "" : "lg:col-start-1 lg:row-start-1"}`}>
          <div className="group relative bg-card rounded-2xl p-5 sm:p-6 border border-border hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Trending Badge */}
            {event.trending && (
              <div className="absolute top-4 right-4 bg-primary px-2 py-1 rounded-full flex items-center gap-1 z-10 text-primary-foreground">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-semibold">Trending</span>
              </div>
            )}

            <div className="relative">
              {/* Mobile Date Badge */}
              <div className="lg:hidden flex items-center gap-4 mb-4 pb-4 border-b border-border">
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 text-primary-foreground">
                  <div className="text-center">
                    <div className="text-xs font-semibold opacity-90">
                      {event.day}
                    </div>
                    <div className="text-2xl font-bold">{event.date}</div>
                  </div>
                </div>
                <div>
                  <div className="text-primary text-xs font-semibold uppercase tracking-wide">
                    {event.month} {event.year}
                  </div>
                  <div className="text-foreground text-sm font-medium flex items-center gap-1.5 mt-1">
                    <Clock className="w-3 h-3 text-primary" />
                    {event.time}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 text-4xl sm:text-5xl opacity-80 group-hover:scale-110 transition-transform">
                  {event.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {event.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{event.attendees} registered</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/main/event-detail/${event._id}`)}
                  className="flex-1 flex items-center justify-center gap-2 text-foreground hover:text-primary hover:bg-primary/10 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  Explore
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(event);
                  }}
                  className="p-3 bg-muted rounded-lg text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
