import ApiService from "./api.service.js"

export default class RegisterService extends ApiService {
  toggleRegisterEvent = async (eventId) => {
    const res = await this.axiosInstance.post(`register/events/${eventId}`)
    return res.data
  }
  registredEvents = async() => {
    const res = await this.axiosInstance.get(`register/events/all-registred`)
    return res.data
  }

}




