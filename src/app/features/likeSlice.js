import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
enableMapSet();



const likesSlice = createSlice({
  name: "likes",
  initialState: {
    eventLikes: new Map(),
    error: null,
    loading: true,
  },
  reducers: {
    setEventLikes: (state, action) => {
      const { eventId, data } = action.payload;
      state.eventLikes.set(eventId, data);
      state.error = null;
      state.loading = false;
    },
    toggleLikeAction : (state, action) => {
      const {email, eventId , name, userId} = action.payload;
      const userObj = {}
      userObj[userId] = {
        email: email,
        name: name,
        likedAt: null,
      }
      if(!state.eventLikes.has(eventId)){
        state.eventLikes.set(eventId, {
          count: count ++,
          users:  userObj
        })
      }else {
        const eventLikes = state.eventLikes.get(eventId);
        if(eventLikes.users?.[userId]){
          delete eventLikes.users?.[userId];
          eventLikes.count --
        }else {
          eventLikes.users[userId] = userObj[userId]
          eventLikes.count ++
        }
      }
    }
  },
});

export const { setEventLikes, toggleLikeAction } = likesSlice.actions;
export default likesSlice.reducer;

