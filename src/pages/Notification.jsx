import { NotificationFilters, NotificationList} from '@/components/notification';
import React, { useMemo, useState } from 'react'
import useNotifications from '@/hooks/useNotifications';
import {FILTERS, transformNotification, EVENT_TYPES, PAYMENT_TYPES } from "@/utils/constant"


const Notification = () => {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const {
      notifications,
      unReadCount,
      hasMorePages,
      fetchLoading,
      // deleteLoading,
      // markAsReadLoading,
      markAsRead,
      markAllAsRead,
      removeNotification,
      loadMore,
    } = useNotifications();

    const transformed = useMemo(() => {
      return notifications.map(notfy => transformNotification(notfy))
    }, [notifications])

    const filtered = useMemo(() => {
      switch (activeFilter) {
        case "UNREAD":
          return transformed.filter((notif) => !notif.read);
        case "EVENTS":
          return transformed.filter((notif) =>
            EVENT_TYPES.includes(notif.type)
          );
        case "PAYMENTS":
          return transformed.filter((notif) =>
            PAYMENT_TYPES.includes(notif.type)
          );
        default:
          return transformed;
      }
    }, [transformed, activeFilter]);


    const handleMarkRead = (id) => {
      markAsRead(id);
      navigate(`/main/notification/${id}`);
    };
  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827]">
              Notifications
            </h1>
            {unReadCount > 0 && (
              <p className="text-sm text-gray-400 mt-1">
                You have{" "}
                <span className="font-semibold text-gray-700">
                  {unReadCount} unread
                </span>
              </p>
            )}
          </div>
          {unReadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs font-medium text-blue-600 mt-2 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              Mark all read
            </button>
          )}
        </div>

        <NotificationFilters
          filters={FILTERS}
          active={activeFilter}
          onChange={setActiveFilter}
          unreadCount={unReadCount}
        />
        <NotificationList
          notifications={filtered}
          onMarkRead={handleMarkRead}
          onDismiss={removeNotification}
          fetchLoading={fetchLoading}
          hasMorePages={hasMorePages}
          onLoadMore={loadMore}
        />
      </div>
    </div>
  );
}

export default Notification
