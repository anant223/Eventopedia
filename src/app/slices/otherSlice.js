import { otherLiveEventsPreview } from "@/features/otherAction";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  pageInfo: null,
  loading: false,
  error: null,
}

const otherSlice = createSlice({
  name: "others",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(otherLiveEventsPreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otherLiveEventsPreview.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.page.number === 0) {
          state.events = action.payload.events;
        }else {
          state.events = [...action.payload.events]
        }
        
        state.pageInfo = action.payload.page
      })
      .addCase(otherLiveEventsPreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearError } = otherSlice.actions;
export default otherSlice.reducer;
