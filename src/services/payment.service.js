import ApiService from "./api.service";

export default class PaymentService extends ApiService {
  createPaymentIntent = async (eventId, payload) => {
    const res = await this.axiosInstance.post(
      `/payments/events/${eventId}/intent`,
      payload
    );
    return res.data;
  };
  createStripeAccount = async () => {
    const res = await this.axiosInstance.post(`/stripe/onboard`);
    return res.data;
  };
  userAccountStatus = async () => {
    const res = await this.axiosInstance.post(`/stripe/status`);
    console.log(res)
    return res.data;
  }
}
