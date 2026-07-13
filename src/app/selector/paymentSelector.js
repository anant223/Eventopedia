export const selectPaymentIntent = (state) => state.payment;
export const selectPaymentClientSecret = (state) => state.payment.clientSecret;
export const selectPaymentError = (state) => state.payment.error;
export const selectPaymentLoading = (state) => state.payment.loading;
export const selectOnboardingUrl = (state) => state.payment.onboardingUrl;
export const selectAccountStatus = (state) => state.payment.accountStatus;