export const selectAllSubscriptions = (state) => state.registration.subscriptions;
export const selectSubscriptionById = (id) => (state) =>
  state.registration.subscriptions[id];
export const selectIsSubscribed = (id) => (state) =>
  Boolean(state.registration.subscriptions[id]);
export const selectSubscriptionCount = (state) =>
  Object.keys(state.registration.subscriptions).length;
