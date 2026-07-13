import ApiService from "./api.service";

export default class NotificationService extends ApiService {
  fetchNotifications = async ({ page = 1, qty = 10 } = {}) => {
    const response = await this.axiosInstance.get("/notification", {
      params: { page, qty },
    });
    return response.data;
  };

  markAsRead = async (notificationId) => {
    const response = await this.axiosInstance.patch(
      `/notification/${notificationId}/read`
    );
    return response.data;
  };

  markAllAsRead = async () => {
    const response = await this.axiosInstance.patch("/notification/read-all");
    return response.data;
  };

  deleteNotification = async (notificationId) => {
    const response = await this.axiosInstance.delete(
      `/notification/${notificationId}`
    );
    return response.data;
  };

 
}