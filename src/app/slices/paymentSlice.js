import { createSlice } from "@reduxjs/toolkit";
import {checkUserAccountStatus, createPaymentIntent, createStripeAccount} from "@/features/paymentAction"


const initialState = {
  clientSecret: null,
  accountStatus: null,
  onboardingUrl: null,
  loading: false,
  error: null,
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
    const onPending = (state) => {
      state.loading = true;
      state.error   = null;
    };
    const onRejected = (state, action) => {
      state.loading = false;
      state.error   = action.payload ?? action.error?.message ?? "Something went wrong";
    };
    builder
      .addCase(createPaymentIntent.pending, onPending)
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(createPaymentIntent.rejected, onRejected)

      .addCase(createStripeAccount.pending, onPending)
      .addCase(createStripeAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.onboardingUrl = action.payload.onboardingUrl;
      })
      .addCase(createStripeAccount.rejected, onRejected)


      .addCase(checkUserAccountStatus.pending, onPending)
      .addCase(checkUserAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.accountStatus = action.payload;
      })
      .addCase(checkUserAccountStatus.rejected, onRejected);
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
