// Get the full Map of eventLikes
export const selectAllLikes = (state) => state.likes.eventLikes;

// Check if a specific user liked a specific event
export const selectIsLiked = (eventId, userId) => (state) => {
  const event = state.likes.eventLikes.get(eventId);
 
  return Boolean(event?.users?.[userId]);

};


export const selectLikesById = (eventId) => (state) => {
  const likes = state.likes?.eventLikes;

  if (!(likes instanceof Map)) {
    return undefined;
  }

  return likes.get(eventId);
};


// Get the like count for a specific event
export const selectLikeCountByEvent = (eventId) => (state) =>
  state.likes.eventLikes.get(eventId)?.likesCount || 0;

// Get total number of liked events
export const selectTotalLikedEvents = (state) => state.likes.eventLikes;
