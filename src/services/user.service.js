import ApiService from "./api.service.js";

export default class UserService extends ApiService {
  signup = async (data) => {
    await this.axiosInstance.post("/users/register", data);
  };
  login = async (userData) => {
    const res = await this.axiosInstance.post("/users/login", userData);
    return res.data;
  };
  logout = async () => {
    const res = this.axiosInstance.post("/users/logout", {});
    return res.data;
  };
  updateProfile = async (data) => {
    const res = await this.axiosInstance.put("/users/update_profile", data);
    return res.data;
  };
  readHistory = async () => {
    const res = await this.axiosInstance.get("/users/history");
    return res.data;
  };

  updatePassword = async (data) => {
    const res = await this.axiosInstance.put(
      "/users/change_password",
      data
    );
    console.log(res.data)
    return res.data;
  };

  resetPassword = async ({token, password}) => {
    const res = await this.axiosInstance.post("/users/reset_password", {
      token,
      newPassword: password,
    });
    return res.data;
  };

  forgetPassword = async (email) => {
    console.log("email", email)
    const res = await this.axiosInstance.post("/users/forget_password", 
      email
    );
    console.log(res)
    return res.data;
  };
  user = async () => {
    const res = await this.axiosInstance.get(`/users/current_user`);
    return res.data;
  };
  refreshToken = async (credentials) => {
    const res = await this.axiosInstance.put(
      "/users/refresh_access_token",
      credentials
    );
    return res.data;
  };

  onBoarding = async (data) => {
    const res = await this.axiosInstance.put("/users/onboarding", data);
    return res.data;
  };

  updateCategories = async (categoryId) => {
    const res = await this.axiosInstance.patch(
      `/users/category/toggle/${categoryId}`
    );
    return res.data;
  };

  updateNotificationPreferences = async ({ key, value }) => {
    const response = await this.axiosInstance.put(
      `/notification/notificationPreferences`,
      { key, value }
    );
    return response.data;
  };

  changeEmail = async ({newEmail, password}) => {
    const response = await this.axiosInstance.post(
      `/users/change_email`,
      { newEmail, password}
    );
    return response.data;
  };

  emailUpdateConfirmation = async (token) => {
    const response = await this.axiosInstance.get(
      `/users/verifying-request?token=${token}`
    );
    return response.data;
  };

  updateLocation = async (data) => {
    const response = await this.axiosInstance.put("/users/update-location", data)
    return response.data;
  }
}


