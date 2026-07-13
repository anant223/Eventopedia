import ApiService from "./api.service";

export default class EventService extends ApiService {
  createEvent = async (data) => {
    const res = await this.axiosInstance.post("/events/create", data);
    return res.data;
  };
  deleteEvent = async (eventId) => {
    const res = await this.axiosInstance.delete(`/events/${eventId}`);
    return res.data;
  };
  updateEvent = async (eventId, data) => {
    const res = await this.axiosInstance.put(`/events/${eventId}`, data);
    return res.data;
  };
  readEvent = async (eventId) => {
    const res = await this.axiosInstance.get(`/events/${eventId}`);
    return res.data;
  };
  readEvents = async () => {
    const res = await this.axiosInstance.get("/events/public");
    return res.data;
  };

  readprivateEvent = async () => {
    const res = await this.axiosInstance.get(
      `/events/private/${eventId}/${token}`
    );
    return res.data;
  };

  updatecohost = async (eventId) => {
    const res = await this.axiosInstance.put(`/events/${eventId}/co-hosts`);
    return res.data;
  };

  updateUserInvitation = async (eventId) => {
    const res = await this.axiosInstance.put(`/events/${eventId}/invitations`);
    return res.data;
  };

  invitationConfirmation = async (eventId) => {
    const res = await this.axiosInstance.put(
      `/events/${eventId}/invitations/respond`
    );
    return res.data;
  };

  activeEvent = async (eventId) => {
    const res = await this.axiosInstance.put(`/events/${eventId}/activate`);
    console.log(res);
    return res.data;
  };

  cancelEvent = async (eventId) => {
    const res = await this.axiosInstance.put(`/events/${eventId}/cancel`);
    return res.data;
  };

}



