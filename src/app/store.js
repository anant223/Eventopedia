import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  devTools: true,
});

export default store

