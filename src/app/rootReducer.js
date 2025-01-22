import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Authentication/authSlice";
import virtualEventsReducer from "../features/AllVirtualEvents/virtualEventsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  virtualEvents: virtualEventsReducer,
});

export default rootReducer;
