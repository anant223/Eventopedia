import ApiService from "./api.service.js";

export default class BookingService extends ApiService {
  getMyBookingForEvent = async (eventId) => {
    const res = await this.axiosInstance.get(`/events/${eventId}/my-booking`);
    return res.data;
  };

  getMyBooking = async () => {
    const res = await this.axiosInstance.get(`/bookings/me`);
    return res.data;
  };
}
