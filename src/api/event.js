import apiRequest from "./apiRequest";

export const eventService = {
  createEvent: (eventData, customHeader = {}) =>
    apiRequest(
      {
        method: "POST",
        url: "events/create-event",
        data: eventData,
        customHeader: {
          "Content-Type": "multipart/form-data",
          ...customHeader, 
        },
      },
      "Failed to create event"
    ),

  updateEvent: (eventData, customHeader = {}) =>
    apiRequest(
      {
        method: "PUT",
        url: "events/update-event",
        data: eventData,
        customHeader: {
          "Content-Type": "multipart/form-data",
          ...customHeader, // Merge any additional custom headers
        },
      },
      "Failed to update event"
    ),

  deleteEvent: (eventId, customHeader = {}) =>
    apiRequest(
      {
        method: "GET",
        url: "events/delete-event",
        params: { eventId },
        customHeader,
      },
      "Failed to delete event"
    ),

  // Event Retrieval
  getAllPublicEvents: (params, customHeader = {}) =>
    apiRequest(
      {
        params,
        method: "GET",
        url: "events/all-public-event",
        customHeader,
      },
      "Failed to fetch public events"
    ),

  getAllPrivateEvents: (customHeader = {}) =>
    apiRequest(
      {
        method: "GET",
        url: "events/all-private-event",
        customHeader,
      },
      "Failed to fetch private events"
    ),

  findEventById: (eventId, customHeader = {}) =>
    apiRequest(
      {
        method: "GET",
        url: "events/find-event-by-id",
        params: { eventId },
        customHeader,
      },
      "Event not found"
    ),
};
