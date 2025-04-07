import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedEvents: [],
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  subscriptions: [],
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

    likedEvent: (state, action) => {
      state.likedEvents = action.payload;
    },

    setAllSubs: (state, action) => {
      state.subscriptions = action.payload.map(({ event }) => event?._id);
    },

    toggleSub: (state, action) => {
      const { event } = action.payload;
      const index = state.subscriptions.findIndex(event => event === event);
      if (index !== -1) {
        state.subscriptions.splice(index, 1);
      } else {
        state.subscriptions.push(event);
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError, likedEvent, setAllSubs, toggleSub} = authSlice.actions;
export default authSlice.reducer;
