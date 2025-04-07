import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const likesSlice = createSlice({
  name: "likes",
  initialState: {},
  reducers: {
    setLikes: (state, action) => {
      const { likes, eventLikeDetails } = action.payload;

      eventLikeDetails.forEach(({ likedBy, eventId }) => {
        if (!state[eventId]) {
          state[eventId] = { likes: likes, likedBy: new Set()};
        }
        state[eventId].likedBy.add(likedBy);
      })

    },
    toggleLike : (state, action) => {
      const {likedBy, eventId} = action.payload;
      if(!state[eventId]){
        state[eventId] = { likes: 1, likedBy: new Set([likedBy]) };
      }else {
         if (state[eventId].likedBy.has(likedBy)) {
           state[eventId].likedBy.delete(likedBy);
           state[eventId].likes -= 1;

           if (state[eventId].likes === 0) {
             delete state[eventId];
           }
         } else {
           state[eventId].likedBy.add(likedBy);
           state[eventId].likes += 1;
         }
      }
      
    },
  }
});

export const { setLikes, toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
