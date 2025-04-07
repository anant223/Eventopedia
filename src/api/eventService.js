import axios from "./axiosInstance";

const eventService = {
  
  createEvent: (data) =>
    axios.post("/events/create-event", data, {
      headers: { "Content-Type": "multipart/form-data"},
    }),

    updateEvent: (data) =>
      axios.put("/events/update-event", data, {
        headers: { "Content-Type": "multipart/form-data"},
    }),

    deleteEvent: (eventId) =>
      axios.get("/events/delete-event", {
        params: { eventId },
        headers: customHeader,
    }),

    getAllPublicEvents: (params, customHeader = {}) =>
      axios.get("/events/all-public-event", {
      params,
      headers: customHeader,
    }),

  getAllPrivateEvents: () =>
    axios.get("/events/all-private-event"),

  findEventById: (eventId) =>
    axios.get("/events/find-event-by-id", {
      params: { eventId },
      headers: customHeader,
    }),
};

export default eventService;
