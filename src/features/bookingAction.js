import { BookingService } from "@/services";
import {createAsyncThunk } from "@reduxjs/toolkit";

const bookingService = new BookingService()

const myBookingDetail = createAsyncThunk(
  "booking/bookingDetail",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await bookingService.getMyBookingForEvent(eventId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch booking detail"
      );
    }
  }
);

const myBookings = createAsyncThunk(
  "booking/myBooking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await bookingService.getMyBookings();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch bookings"
      );
    }
  }
);

export {myBookings, myBookingDetail}