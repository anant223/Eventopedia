import { useEffect, useState } from "react";
import likeService from "../api/likeService";
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "../app/features/likeSlice";
import {selectEventLikes} from "../app/selector/likeSelector";
import { selectUserLikedEvent } from "../app/selector/authSelector";
import { likedEvent } from "../app/features/authSlice";

const useLike = (eventId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const likes = useSelector(selectEventLikes);
  const isLiked = useSelector(selectUserLikedEvent(eventId));


  useEffect(() => {
    
      if(!eventId) return;
      setLoading(true);
      
      Promise.allSettled([
        likeService.getAllLikesById(eventId),
        likeService.getLikedEvents()
      ])
      .then(([likesResponse, likedEventResponse]) => {

        if (likesResponse.status === "fulfilled" && likesResponse.value) {
          dispatch(setLikes(likesResponse.value.data?.data));
        }

        if (likedEventResponse.status === "fulfilled" && likedEventResponse.value) {
          dispatch(likedEvent(likedEventResponse.value.data?.data));
        }

      })
      .catch((error) => console.error("Error fetching likes:", error))
      .finally(() => setLoading(false));
    }, [eventId, dispatch]);


  return {loading, likes, isLiked,};
};

export default useLike;
