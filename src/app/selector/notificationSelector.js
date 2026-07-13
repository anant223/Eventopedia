import { createSelector } from "@reduxjs/toolkit";

// base selector
const selectNotificationState = (state) => state.notifications;

// data
export const selectAllNotifications = (state) =>
  state.notifications.notifications;
export const selectUnReadCount = (state) => state.notifications.unReadCount;
export const selectTotalCount = (state) => state.notifications.totalCount;
export const selectTotalPages = (state) => state.notifications.totalPages;
export const selectCurrentPage = (state) => state.notifications.currentPage;

// loading states
export const selectFetchLoading = (state) => state.notifications.fetchLoading;
export const selectMarkAsReadLoading = (state) =>
  state.notifications.markAsReadLoading;
export const selectMarkAllAsReadLoading = (state) =>
  state.notifications.markAllAsReadLoading;
export const selectDeleteLoading = (state) => state.notifications.deleteLoading;

// error
export const selectNotificationError = (state) => state.notifications.error;

export const selectHasUnread = createSelector(
  selectUnReadCount,
  (unReadCount) => unReadCount > 0
);

export const selectUnreadNotifications = createSelector(
  selectAllNotifications,
  (notifications) => notifications.filter((n) => !n.isRead)
);

export const selectHasMorePages = createSelector(
  (state) => state.notifications.currentPage,
  (state) => state.notifications.totalPages,
  (currentPage, totalPages) => currentPage < totalPages // ✅ for load more button
);
