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

if (typeof window !== "undefined") {
  window.store = store;
}
export default store

