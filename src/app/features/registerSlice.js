import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  subscriptions: {},
  loading: false,
  error: null
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    toggleSubscription: (state, action) => {
      const { event, ...rest } = action.payload;
      if (state.subscriptions[event]) {
        delete state.subscriptions[event];
      }else {
        state.subscriptions[event] = rest;
      } 
    },

    updateSubscriptions: (state, action) => {
      const { event, ...res } = action.payload;
      if (state.subscriptions[event]) {
        state.subscriptions[event] = {
          ...state.subscriptions[event],
          ...res,
        };
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSubscribedEvents: (state, action) => {
      state.subscriptions = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  toggleSubscription, 
  updateSubscriptions, 
  setError, 
  setSubscribedEvents  
} = registrationSlice.actions;

export default registrationSlice.reducer;
