import { LikeService } from "@/services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

const likeService = new LikeService();

export const toggleEventLike = createAsyncThunk(
  "like/toggle",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await likeService.toggleEventLike(eventId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to toggle like");
    }
  }
);

export const fetchEventLikedUsers = createAsyncThunk(
  "like/eventLikedUsers",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await likeService.getEventLikedUsers(eventId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch likes");
    }
  }
);

export const fetchUserLikedEvents = createAsyncThunk(
  "like/userLikedEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await likeService.getLikedEventsByUser();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch liked events"
      );
    }
  }
);
