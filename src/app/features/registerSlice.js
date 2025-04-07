import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredEvents: [],
  isRegistered: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    registeredUser: (state, action) => {
      state.isRegistered = true;
      state.registeredEvents = action.payload;
    },
    
    toggleEventRegistration: (state, action) => {
      const { eventId, subscriber, isSubscribed } = action.payload;
      
      const findIndex = state.registeredEvents.findIndex(
        (event) => event.eventId === eventId && event.subscriber === subscriber
      );
      if(findIndex !== -1){
        state.registeredEvents.splice(findIndex, 1);
        state.registeredEvents[findIndex]
      }else{
        state.registeredEvents.push({ eventId, subscriber, isSubscribed });
        state.isRegistered = true
      }      
    },
  },
});

export const {registeredUser, toggleEventRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
