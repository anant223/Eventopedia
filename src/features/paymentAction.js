import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaymentService } from "@/services";

const paymentService = new PaymentService();

export const createPaymentIntent = createAsyncThunk(
  "payment/createIntent",
  async ({ eventId, ticketQuantity }, { rejectWithValue }) => {
    try {
      const res = await paymentService.createPaymentIntent(eventId, {
        ticketQuantity,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create payment intent"
      );
    }
  }
);
export const createStripeAccount = createAsyncThunk(
  "stripe/checkAccountStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await paymentService.createStripeAccount();
      console.log(res)
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create stripe account"
      );
    }
  }
);
export const checkUserAccountStatus = createAsyncThunk(
  "stripe/createAccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await paymentService.userAccountStatus();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch account status"
      );
    }
  }
);