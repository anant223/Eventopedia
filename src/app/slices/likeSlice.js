import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { eventLikes, toggleEventLike, userLikeHistory } from "@/features/eventActions";
enableMapSet();

const initialState = {
  eventLikes: {},  
  userLikedEvents: [],  
  eventLikedUsers: {},
  toggleLoading: {},
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    
    clearEventLikes: (state, action) => {
      const eventId = action.payload;
      delete state.eventLikes[eventId];
      delete state.eventLikedUsers[eventId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleEventLike.pending, (state, action) => {
        const eventId = action.meta.arg;
        state.toggleLoading[eventId] = true;
        if (state.eventLikes[eventId]) {
          const currentLike = state.eventLikes[eventId];
          state.eventLikes[eventId] = {
            count: currentLike.count + (currentLike.isLiked ? -1 : 1),
            isLiked: !currentLike.isLiked,
          };
        } else {
          state.eventLikes[eventId] = { count: 1, isLiked: true };
        }
      })
      .addCase(toggleEventLike.fulfilled, (state, action) => {
        const { eventId, likeCount, isLiked } = action.payload;
        state.toggleLoading[eventId] = false;
        state.eventLikes[eventId] = {
          count: likeCount,
          isLiked: isLiked,
        };

        if (isLiked) {
          if (!state.userLikedEvents.find((e) => e._id === eventId)) {
            state.userLikedEvents.push({ _id: eventId });
          }
        } else {
          state.userLikedEvents = state.userLikedEvents.filter(
            (e) => e._id !== eventId
          );
        }
      })
      .addCase(toggleEventLike.rejected, (state, action) => {
        const eventId = action.meta.arg;
        state.toggleLoading[eventId] = false;

        // Revert optimistic update
        if (state.eventLikes[eventId]) {
          const currentLike = state.eventLikes[eventId];
          state.eventLikes[eventId] = {
            count: currentLike.count + (currentLike.isLiked ? -1 : 1),
            isLiked: !currentLike.isLiked,
          };
        }

        state.error = action.payload;
      })
      .addCase(userLikeHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLikeHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.userLikedEvents = action.payload;

        action.payload.forEach((event) => {
          state.eventLikes[event._id] = {
            count: event.likeCount || 0,
            isLiked: true,
          };
        });
      })
      .addCase(userLikeHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(eventLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eventLikes.fulfilled, (state, action) => {
        state.loading = false;
        const { eventId, users } = action.payload;
        state.eventLikedUsers[eventId] = users;

        if (!state.eventLikes[eventId]) {
          state.eventLikes[eventId] = {
            count: users.length,
            isLiked: false, 
          };
        } else {
          state.eventLikes[eventId].count = users.length;
        }
      })
      .addCase(eventLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearEventLikes } = likeSlice.actions;
export default likeSlice.reducer;


