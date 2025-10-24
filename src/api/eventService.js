import axios from "./axiosInstance";

const eventService = {
  // GET /events/public
  getAllPublicEvents: () => axios.get("/events/public"),

  // GET /events/private/:eventId/:token
  getPrivateEvent: (eventId, token) =>
    axios.get(`/events/private/${eventId}/${token}`),

  // POST /events/create (with JWT + file upload)
  createEvent: (data) => axios.post("/events/create", data),

  // DELETE /events/:eventId (with JWT)
  deleteEvent: (eventId) => axios.delete(`/events/${eventId}`),

  // PUT /events/:eventId (with JWT)
  updateEvent: (eventId, data) => axios.put(`/events/${eventId}`, data),

  // GET /events/:eventId (with JWT)
  findEventById: (eventId) => axios.get(`/events/${eventId}`),

  createLocation: (input) => axios.get(`/google/place`, {
  params: { input }})
};

export default eventService;

