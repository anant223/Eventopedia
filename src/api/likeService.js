import axios from "./axiosInstance.js";

const likeService = {
  toggleEventLike: (eventId) => axios.post(`/likes/events/${eventId}/toggle`),
  getEventLikes: (eventId) => axios.get(`/likes/event/${eventId}`),
  getLikedEvents: () => axios.get("/likes/events/all"),
};

export default likeService;
