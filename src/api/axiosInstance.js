import axios from "axios"
// https://eventopida-server.onrender.com
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
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

    if(err.response?.status === 401){
      
      window.location.href = "/auth?type=login"
    }
    return Promise.reject(err)
  }

)


export default axiosInstance;