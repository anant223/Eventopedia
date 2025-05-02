import likeService from "../../api/likeService.js";
import { toggleLike } from "../../app/features/likeSlice";

const toggleLikeEvent = (eventId) => async (dispatch) => {
  try {
    const likeData = await likeService.toggleEventLike(eventId);
    if (likeData && likeData.data && likeData.data.data) {
      dispatch(toggleLike(likeData.data.data));
    } else {
      console.warn("likeService returned invalid data:", likeData);
    }
  } catch (error) {
    console.error("Error toggling like for eventId:", eventId, error); 
    return;
  }
};


export { toggleLikeEvent };
