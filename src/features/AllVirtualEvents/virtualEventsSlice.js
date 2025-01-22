import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: null,
  loading: false,
  error: null,
};

const virtualEventsSlice = createSlice({
  name: "virtualEvents",
  initialState,
  reducers: {
    allVirtualEvents: (state, action) => {
      state.events = action.payload; // Fixed the bug by changing 'virtualMeeting' to 'events'
      state.error = null;
    },
    setVirtualEventsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { allVirtualEvents, setVirtualEventsError } =
  virtualEventsSlice.actions;
export default virtualEventsSlice.reducer;
