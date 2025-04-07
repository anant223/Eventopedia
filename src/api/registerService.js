import axios from "../api/axiosInstance.js"

const registerService = {
    register : (eventId) => axios.post(`register/events/${eventId}`),
    registredEvents : () => axios.get(`register/events/all-registred`),

}
export default registerService