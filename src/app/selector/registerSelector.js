import { createSelector } from "@reduxjs/toolkit";

export const selectRegistration = (state) => state.registration;
export const selectRegisteredEvents = (state) => state.registration.registeredEvents;
export const selectRegistrationLoading = (state) => state.registration.loading;
export const selectToggleLoading = (state) => state.registration.toggleLoading;
export const selectRegistrationError = (state) => state.registration.error;

export const selectIsEventRegistered = (eventId) => createSelector(
  [selectRegisteredEvents], (state) => {
    return state.registration?.registeredEvents.some(event => event._id === eventId)
  }
)
export const selectRegisteredEventIds = createSelector(
  [selectRegisteredEvents],
  (registeredEvents) => registeredEvents.map((event) => event._id)
);

export const selectRegisteredEventsCount = createSelector(
  [selectRegisteredEvents],
  (registeredEvents) => registeredEvents.length
);

export const selectUpcomingRegisteredEvents = createSelector(
  [selectRegisteredEvents],
  (registeredEvents) => {
    const now = new Date();
    return registeredEvents.filter(
      (event) => new Date(event.startDateTime) > now
    );
  }
);

// export const selectAllSubscriptions = (state) => state.registration.subscriptions;
// export const selectSubscriptionById = (id) => (state) =>
//   state.registration.subscriptions[id];
// export const selectIsSubscribed = (id) => (state) =>
//   Boolean(state.registration.subscriptions[id])
// export const selectSubscriptionCount = (state) =>
//   Object.keys(state.registration.subscriptions).length;
