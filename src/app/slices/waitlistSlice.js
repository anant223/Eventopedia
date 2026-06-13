import { createSlice } from "@reduxjs/toolkit";
import { createWaitlist } from "@/features/waitlistAction";

const initialState = {
  email: null,
  loading: false,
  error: null,
};

const waitlistSlice = createSlice({
  name: "waitlist",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createWaitlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createWaitlist.fulfilled, (state, action) => {
        state.loading = false;

        state.email = action.payload?.email ?? null;
      })

      .addCase(createWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = waitlistSlice.actions;

export default waitlistSlice.reducer;
