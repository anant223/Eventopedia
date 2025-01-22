import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable check
    }),
  devTools: true,
});

export default store

