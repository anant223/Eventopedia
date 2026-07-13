import ApiService from "./api.service.js";

export default class LikeService extends ApiService {
  toggleEventLike = async (eventId) => {
    const res = await this.axiosInstance.post(`/likes/events/${eventId}`);
    return res.data;
  };

  getLikedEventsByUser = async () => {
    const res = await this.axiosInstance.get(`/likes/users/me`);
    return res.data;
  };

  getEventLikedUsers = async (eventId) => {
    const res = await this.axiosInstance.get(`/likes/events/${eventId}/users`);
    return res.data;
  };
}


// {
//   toggleEventLike: (eventId) => axios.post(`/likes/events/${eventId}/toggle`),
//   getEventLikes: (eventId) => axios.get(`/likes/event/${eventId}`),
//   getLikedEvents: () => axios.get("/likes/events/all"),
// };

// export default likeService;
