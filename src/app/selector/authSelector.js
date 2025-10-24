export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectUserLikedEvent = (eventId) => (state) => state.auth.likedEvents.some(event => event._id === eventId);
export const selectUserOrganizedHistory = (state) =>
  state.auth.userEvents.organized;
export const selectUserAttendedHistory = (state) =>
  state.auth.userEvents.attended;

