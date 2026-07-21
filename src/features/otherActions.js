import { createAsyncThunk } from "@reduxjs/toolkit";
import  OtherService  from "@/services/other.service";

const otherService = new OtherService();

export const otherLiveEventsPreview = createAsyncThunk(
  "events/lives",
  async (
    { lat, lng, page, size, radius},
    { rejectWithValue }
  ) => {
    try {
      const res = await otherService.otherLiveEventsPreview({lat, lng, page, size, radius});
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch preview");
    }
  }
);