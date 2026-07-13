import { createSelector } from "@reduxjs/toolkit";

export const selectLike = (state) => state.likes;
export const selectEventLikes = (state) => state.likes.eventLikes;
export const selectUserLikedEvents = (state) => state.likes.userLikedEvents;
export const selectEventLikedUsers = (state) => state.likes.eventLikedUsers;
export const selectToggleLoading = (state) => state.likes.toggleLoading;
export const selectLikeLoading = (state) => state.likes.loading;
export const selectLikeError = (state) => state.likes.error;

// Memoized selectors
export const selectEventLikeDetails = (eventId) =>
  createSelector(
    [selectEventLikes],
    (eventLikes) => eventLikes[eventId] || { count: 0, isLiked: false }
  );

export const selectIsEventLiked = (eventId) =>
  createSelector(
    [selectEventLikes],
    (eventLikes) => eventLikes[eventId]?.isLiked || false
  );

export const selectEventLikeCount = (eventId) =>
  createSelector(
    [selectEventLikes],
    (eventLikes) => eventLikes[eventId]?.count || 0
  );

export const selectIsEventLikeLoading = (eventId) =>
  createSelector(
    [selectToggleLoading],
    (toggleLoading) => toggleLoading[eventId] || false
  );

export const selectUsersWhoLikedEvent = (eventId) =>
  createSelector(
    [selectEventLikedUsers],
    (eventLikedUsers) => eventLikedUsers[eventId] || []
  );

export const selectUserLikedEventsCount = createSelector(
  [selectUserLikedEvents],
  (userLikedEvents) => userLikedEvents.length
);

export const selectUserLikedEventIds = createSelector(
  [selectUserLikedEvents],
  (userLikedEvents) => userLikedEvents.map((e) => e._id)
);
