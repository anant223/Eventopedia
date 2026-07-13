import store from "@/app/store";
import AppService from "./app.service";
// import { clearUser } from "@/app/slices/authSlice";

export default class ApiService extends AppService {
  constructor() {
    super();
    this.baseURL = `${this.baseURI}/api/v1`;
    this.axiosInstance = this.getAxiosInstance({
      baseURL: this.baseURL,
    });
    this.setupInterceptors()
  }


  setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
      const status = err.response?.status;
      const url = err.config?.url;

      if (status === 401) {
        const isAuthRoute =
            url?.includes("/login") || url?.includes("/register");

        if (isAuthRoute) {
          return Promise.reject(err);
        }

        return Promise.reject(err)
      }
      return Promise.reject(err);
      }
    );
  }
}
