import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/app/slices/authSlice.js";
import eventsReducer from "@/app/slices/eventsSlice.js";
import likesReducer from "@/app/slices/likeSlice.js";
import registrationReducer from "@/app/slices/registerSlice";
// import bookingReducer from "@/app/slices/registerSlice";
// import paymentReducer from "@/app/slices/paymentSlice";
// import notificationReducer  from "@/app/slices/notificationSlice";
// import categoryReducer from "@/app/slices/categorySlice"
import waitlistReducer from "@/app/slices/waitlistSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventsReducer,
  likes: likesReducer,
  registration: registrationReducer,
  // booking: bookingReducer,
  // payment: paymentReducer,
  // notifications: notificationReducer,
  // category: categoryReducer,
  waitlist: waitlistReducer
});

export default rootReducer;
