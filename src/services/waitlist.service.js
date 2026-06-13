import ApiService from "./api.service.js";

export default class Waitlist extends ApiService {
  createWaitlist = async (email) => {
    const res = await this.axiosInstance.post("/waitlist/create", email);
    return res.data;
  };
}
