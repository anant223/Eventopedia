import { createEvent, deleteEvent, fetchAllEvents, fetchEventById, updateEvent, updateCoHost, inviteUsers, cancelEvent, respondInvitation, activateEvent } from "@/features/eventActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  eventInfo: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  hostLoading: false,
  inviteLoading: false,
  statusLoading: false

};

const eventSlice = createSlice({
  name: "event",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(createEvent.pending, (state) => {
          state.createLoading = true;
          state.error = null;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
          state.createLoading = false;
          state.events.unshift(action.payload);
        })
        .addCase(createEvent.rejected, (state, action) => {
          state.createLoading = false;
          state.error = action.payload;
        })
        .addCase(deleteEvent.pending, (state) => {
          state.deleteLoading = true;
          state.error = null;
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
          state.deleteLoading = false;
          state.events = state.events.filter(
            (event) => event._id !== action.payload.eventId
          );
        })
        .addCase(deleteEvent.rejected, (state, action) => {
          state.deleteLoading = false;
          state.error = action.payload;
        })
        .addCase(updateEvent.pending, (state) => {
          state.updateLoading = true;
          state.error = null;
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
          state.updateLoading = false;
          const index = state.events.findIndex(
            (event) => event._id === action.payload._id
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        })
        .addCase(updateEvent.rejected, (state, action) => {
          state.updateLoading = false;
          state.error = action.payload;
        })
        .addCase(fetchAllEvents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.events = action.payload.events || [];
          state.error = null;
        })
        .addCase(fetchAllEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchEventById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEventById.fulfilled, (state, action) => {
          state.loading = false;
          state.eventInfo = action.payload;
        })
        .addCase(fetchEventById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateCoHost.pending, (state) => {
          state.hostLoading = true;
          state.error = null;
        })
        .addCase(updateCoHost.fulfilled, (state, action) => {
          state.hostLoading = false;
          state.eventInfo = action.payload;
        })
        .addCase(updateCoHost.rejected, (state, action) => {
          state.hostLoading = false;
          state.error = action.payload;
        })
        .addCase(inviteUsers.pending, (state) => {
          state.inviteLoading = true;
          state.error = null;
        })
        .addCase(inviteUsers.fulfilled, (state, action) => {
          state.inviteLoading = false;
          state.eventInfo = action.payload;
        })
        .addCase(inviteUsers.rejected, (state, action) => {
          state.inviteLoading = false;
          state.error = action.payload;
        })
        .addCase(respondInvitation.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(respondInvitation.fulfilled, (state, action) => {
          state.loading = false;
          state.eventInfo = action.payload;
        })
        .addCase(respondInvitation.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(cancelEvent.pending, (state) => {
          state.statusLoading = true;
          state.error = null;
        })
        .addCase(cancelEvent.fulfilled, (state, action) => {
          state.statusLoading = false;
          state.eventInfo = action.payload;
        })
        .addCase(cancelEvent.rejected, (state, action) => {
          state.statusLoading = false;
          state.error = action.payload;
        })
        .addCase(activateEvent.pending, (state) => {
          state.statusLoading = true;
          state.error = null;
        })
        .addCase(activateEvent.fulfilled, (state, action) => {
          state.statusLoading = false;
          state.eventInfo = action.payload;
        })
        .addCase(activateEvent.rejected, (state, action) => {
          state.statusLoading = false;
          state.error = action.payload;
        });
    }
});


export const {clearError} = eventSlice.actions;
export default eventSlice.reducer;


