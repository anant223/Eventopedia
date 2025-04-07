import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import virtualEventsReducer from "./features/virtualEventsSlice.js";
import likesReducer from "./features/likeSlice.js";
import registrationReducer from "./features/registerSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  virtualEvents: virtualEventsReducer,
  likes: likesReducer,
  registration: registrationReducer
});

export default rootReducer;
