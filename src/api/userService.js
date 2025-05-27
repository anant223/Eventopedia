import axiosInstance from "./axiosInstance.js";

const userService = {
  // Authentication
  registerUser: (userData) =>
    axiosInstance.post("/users/register", userData),

  loginUser: (userData) =>
    axiosInstance.post("/users/login", userData),

  logoutUser: () => axiosInstance.post("/users/logout", {}),

  refreshToken: (credentials) =>
    axiosInstance.put("/users/refresh_access_token", credentials),

  // User Profile Management
  fetchCurrentUser: () => axiosInstance.get(`/users/current_user`),
  
  updateUserProfile: (profileData) =>
    axiosInstance.put("/users/update_profile", profileData),

  updateUserAvatar: (formData) =>
    axiosInstance.put("/users/update_avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Password Management
  updatePassword: (passwordData) =>
    axiosInstance.put("/users/change_password", passwordData),

  resetUserPassword: (resetData) =>
    axiosInstance.put("/users/reset_password", resetData),

  requestPasswordReset: (email) =>
    axiosInstance.post("/users/forgot_password", { email }),
  

};

export default userService;


