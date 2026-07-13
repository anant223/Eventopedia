import { createSlice } from "@reduxjs/toolkit";
import {checkUserAccountStatus, createPaymentIntent, createStripeAccount} from "@/features/paymentAction"


const initialState = {
  clientSecret: null,
  accountStatus: null,
  onboardingUrl: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.clientSecret = null;
      state.onboardingUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(createStripeAccount.fulfilled, (state, action) => {
        state.onboardingUrl = action.payload.onboardingUrl;
      })
      .addCase(checkUserAccountStatus.fulfilled, (state, action) => {
        state.accountStatus = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
