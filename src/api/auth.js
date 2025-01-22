import apiRequest from "./apiRequest.js";


export const userService = {
  createUser: (userData, customHeader = {}) =>
    apiRequest(
      {
        method: "POST",
        url: "/users/register",
        data: userData,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to create user"
    ),

  loginSession: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "POST",
        url: "/users/login",
        data: credentials,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Invalid login credentials"
    ),

  logoutSession: (customHeader = {}) =>
    apiRequest(
      {
        method: "POST",
        url: "/users/logout",
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to logout"
    ),

  refreshAccessToken: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "PUT",
        url: "/users/refresh_access_token",
        data: credentials,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to refresh access token"
    ),

  // Profile Management
  getCurrentUser: (customHeader = {}) =>
    apiRequest(
      {
        method: "GET",
        url: "/users/current_user",
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "User not found"
    ),

  updateProfile: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "PUT",
        url: "/users/update_profile",
        data: credentials,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to update profile"
    ),

  updateAvatar: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "PUT",
        url: "/users/update_avatar",
        data: credentials,
        customHeader: {
          "Content-Type": "multipart/form-data",
          ...customHeader, 
        },
      },
      "Failed to update avatar"
    ),

  // Password Management
  changePassword: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "PUT",
        url: "/users/change_password",
        data: credentials,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to change password"
    ),

  resetPassword: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "PUT",
        url: "/users/reset_password",
        data: credentials,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to reset password"
    ),

  forgotPassword: (credentials, customHeader = {}) =>
    apiRequest(
      {
        method: "POST",
        url: "/users/forgot_password",
        data: credentials,
        customHeader: { "Content-Type": "application/json", ...customHeader },
      },
      "Failed to process forgot password request"
    ),
};

