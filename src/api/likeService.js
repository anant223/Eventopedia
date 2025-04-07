import axios from "./axiosInstance.js";

const likeService = {
  toggleEventLike: (eventId) => axios.post(`/likes/events/${eventId}/toggle`),
  getAllLikesById: (eventId) => axios.get(`/likes/events/${eventId}`),
  getLikedEvents: () => axios.get("/likes/events/all"),
};

export default likeService;
