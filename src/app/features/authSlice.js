import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userEvents: {
    organized: null,
    attended: null,
  },
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isAuthenticated = true),
        (state.user = action.payload),
        (state.error = null);
    },

    logout: (state, _) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setUserEvents: (state, action) => {
      state.userEvents.organized = action.payload.history.organizedEvent;
      state.userEvents.attended = action.payload.history.attendedEvent;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setUserEvents ,setError} = authSlice.actions;
export default authSlice.reducer;
