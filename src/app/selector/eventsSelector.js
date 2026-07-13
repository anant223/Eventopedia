import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectEvent = (state) => state.event;
export const selectAllEvents = (state) => state.event.events;
export const selectCurrentEvent = (state) => state.event.eventInfo;
export const selectEventLoading = (state) => state.event.loading;
export const selectEventError = (state) => state.event.error;
export const selectCreateLoading = (state) => state.event.createLoading;
export const selectUpdateLoading = (state) => state.event.updateLoading;
export const selectDeleteLoading = (state) => state.event.deleteLoading;
export const selectStatusLoading = (state) => state.event.statusLoading;
export const selectInviteLoading = (state) => state.event.inviteLoading;
export const selectHostLoading = (state) => state.event.hostLoading;

// Memoized selectors
export const selectEventsCount = createSelector(
  [selectAllEvents],
  (events) => events.length
);
export const selectUpcomingEvents = createSelector(
  [selectAllEvents],
  (events) => {
    const now = new Date();
    return events.filter((event) => new Date(event.date) > now);
  }
);
export const selectPastEvents = createSelector([selectAllEvents], (events) => {
  const now = new Date();
  return events.filter((event) => new Date(event.startDateTime) <= now);
});
export const selectEventById = (eventId) =>
  createSelector([selectAllEvents], (events) =>
    events.find((event) => event._id === eventId)
);

export const selectEventsByOrganizer = (organizerId) =>
  createSelector([selectAllEvents], (events) =>
    events.filter((event) => event.organizer === organizerId)
  );

export const selectFeaturedEvents = createSelector(
  [selectAllEvents],
  (events) => events.filter((event) => event.isFeatured)
);

export const selectPopularEvents = createSelector(
  [selectAllEvents],
  (events) => {
    return [...events]
      .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
      .slice(0, 10);
  }
);

export const selectEventsByCategory = (category) =>
  createSelector([selectAllEvents], (events) =>
    events.filter((event) => event.category === category)
);

export const selectEventsByLocation = (location) =>
  createSelector([selectAllEvents], (events) =>
    events.filter((event) => event.location === location)
  );

export const selectSearchEvents = (searchTerm) =>
  createSelector([selectAllEvents], (events) => {
    if (!searchTerm) return events;
    const term = searchTerm.toLowerCase();
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
    );
});


export const selectCurrentEventDetails = createSelector(
  [selectCurrentEvent],
  (event) => {
    if (!event) return null;
    return {
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      organizer: event.organizer,
      attendees: event.attendees || [],
      likeCount: event.likeCount || 0,
      isLiked: event.isLiked || false,
      image: event.image,
      category: event.category,
    };
  }
);

export const selectEventCategories = createSelector(
  [selectAllEvents],
  (events) => {
    const categories = new Set(events.map((event) => event.category));
    return Array.from(categories).filter(Boolean);
  }
);

export const selectEventLocations = createSelector(
  [selectAllEvents],
  (events) => {
    const locations = new Set(events.map((event) => event.location));
    return Array.from(locations).filter(Boolean);
  }
);


