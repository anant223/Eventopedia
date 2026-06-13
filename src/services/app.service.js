import axios from "axios";
export default class AppService {
  constructor() {
    this.baseURI = import.meta.env.VITE_API_BASE_URL;
  }

  getAxiosInstance(config){
    return axios.create(
      {
        timeout : 30000,
        withCredentials: true,
        ...config
      }
    )
  }
}