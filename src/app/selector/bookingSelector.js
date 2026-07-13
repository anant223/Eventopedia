export const selectBookingState = (state) => state.booking;
export const selectAllBookings = (state) => state.booking.bookings;
export const selectMyBookingDetails = (state) => state.booking.bookingDetail;
export const selectBookingLoading = (state) => state.booking.loading;
export const selectBookingError = (state) => state.booking.error;


