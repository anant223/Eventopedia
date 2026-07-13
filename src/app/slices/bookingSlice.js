import { createSlice } from "@reduxjs/toolkit";
import { myBooking, myBookingDetail } from "@/features/bookingAction";

const initialState = {
  bookings: [],
  bookingDetail: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    clearBookingDetail: (state) => {
      state.bookingDetail = null;
    },
  },
    extraReducers: (builder) => {
        builder
    .addCase(myBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(myBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
    })
    .addCase(myBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(myBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(myBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetail = action.payload;
    })
    .addCase(myBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
  },
});

export const { clearBookingError, clearBookingDetail } = bookingSlice.actions;

export default bookingSlice.reducer;
