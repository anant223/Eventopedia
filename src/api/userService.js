import axios from "./axiosInstance.js";

const userService = {
  // Authentication
  registerUser: (userData) =>
    axios.post("/users/register", userData),

  loginUser: (userData) =>
    axios.post("/users/login", userData),

  logoutUser: () => axios.post("/users/logout", {}),

  refreshToken: (credentials) =>
    axios.put("/users/refresh_access_token", credentials),

  // User Profile Management
  fetchCurrentUser: () => axios.get("/users/current_user"),

  updateUserProfile: (profileData) =>
    axios.put("/users/update_profile", profileData),

  updateUserAvatar: (formData) =>
    axios.put("/users/update_avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Password Management
  updatePassword: (passwordData) =>
    axios.put("/users/change_password", passwordData),

  resetUserPassword: (resetData) =>
    axios.put("/users/reset_password", resetData),

  requestPasswordReset: (email) =>
    axios.post("/users/forgot_password", { email }),
};

export default userService;


