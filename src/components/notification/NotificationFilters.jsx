import React from "react";

const NotificationFilters = ({ filters, active, onChange, unreadCount }) => (
    <div className="flex gap-2 mb-6 pb-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filters.map((filter) => (
            <button
                key={filter.value}
                onClick={() => onChange(filter.value)}
                className="filter-pill whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border"
                style={{
                    backgroundColor: active === filter.value ? "#111827" : "white",
                    color: active === filter.value ? "white" : "#6B7280",
                    borderColor: active === filter.value ? "#111827" : "#E5E7EB",
                }}
            >
                {filter.label}
                {filter.value === "UNREAD" && unreadCount > 0 && (
                    <span
                        className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                            backgroundColor: active === filter.value 
                                ? "rgba(255,255,255,0.2)" 
                                : "#F3F4F6",
                            color: active === filter.value ? "white" : "#374151",
                        }}
                    >
                        {unreadCount}
                    </span>
                )}
            </button>
        ))}
    </div>
);

export default NotificationFilters;

