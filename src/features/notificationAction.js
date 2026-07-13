import NotificationService from "@/services/notification.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const notificationService = new NotificationService();

export const fetchNotifications = createAsyncThunk(
  "notification/fetchAll",
  async ({ page = 1, qty = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await notificationService.fetchNotifications({ page, qty });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const res = await notificationService.markAsRead(notificationId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to mark notification as read"
      );
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await notificationService.markAllAsRead();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to mark all notifications as read"
      );
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/delete",
  async (notificationId, { rejectWithValue }) => {
    try {
      const res = await notificationService.deleteNotification(notificationId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete notification"
      );
    }
  }
);
