import axios from "axios"
import store from "@/app/store";
import { logout } from "@/app/features/authSlice";
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
);

axiosInstance.interceptors.response.use(
  (res) =>  res,
  (err) => {
    store.dispatch(logout())
    // if(err.response?.status === 401){
    //   window.location.href = "/auth?type=login"
    // }
    return Promise.reject(err)
  }

)


export default axiosInstance;