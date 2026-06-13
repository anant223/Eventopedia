import { combineReducers } from "@reduxjs/toolkit";
// import authReducer from "@/app/slices/authSlice.js";
// import eventsReducer from "@/app/slices/eventsSlice.js";
// import likesReducer from "@/app/slices/likeSlice.js";
// import registrationReducer from "@/app/slices/registerSlice";
import waitlistReducer from "@/app/slices/waitlistSlice";

// const rootReducer = combineReducers({
  // auth: authReducer,
  // event: eventsReducer,
  // likes: likesReducer,
  // registration: registrationReducer,
//   waitlist: waitlistReducer,
// });

const rootReducer = combineReducers({
  auth: (
    state = {
      isAuthenticated: false,
      user: null,
      initialized: false,
      loading: false,
    }
  ) => state,
  waitlist: waitlistReducer,
});

export default rootReducer;
