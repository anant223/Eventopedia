import Waitlist from "@/services/waitlist.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const waitlistService = new Waitlist()

export const createWaitlist = createAsyncThunk(
  "registration/toggle",
  async (email, { rejectWithValue }) => {
    try {
      const response = await waitlistService.createWaitlist(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to toggle registration"
      );
    }
  }
);
