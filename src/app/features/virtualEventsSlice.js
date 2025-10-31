import { createSlice } from "@reduxjs/toolkit";
import { current } from "immer";


const initialState = {
  events: null,
  eventInfo: null,
  loading: false,
  error: null,
};

const virtualEventsSlice = createSlice({
  name: "virtualEvents",
  initialState,
  reducers: {
    allVirtualEvents: (state, action) => {
      state.events = action.payload;
      state.error = null;
    },
    singleEvent: (state, action) => {
      state.eventInfo = action.payload;
      state.error = null;
    },
    setVirtualEventsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { allVirtualEvents, setVirtualEventsError, singleEvent } = virtualEventsSlice.actions;
export default virtualEventsSlice.reducer;
