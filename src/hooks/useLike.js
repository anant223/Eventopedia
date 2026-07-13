import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleEventLike,
  fetchEventLikedUsers,
  fetchUserLikedEvents,
} from "@/features/likeActions";
import {
  selectEventLikeCount,
  selectEventLikeDetails,
  selectIsEventLikeLoading,
  selectToggleLoading,
  selectUserLikedEventIds,
  selectUsersWhoLikedEvent,
  selectUserLikedEvents,
  selectLikeError,
} from "@/app/selector/likeSelector";

const useLike = (eventId) => {
  const dispatch = useDispatch();

  const likeDetails = useSelector(selectEventLikeDetails(eventId));
  const likeCount = useSelector(selectEventLikeCount(eventId));
  const isLiked = likeDetails?.isLiked || false;
  const isLoading = useSelector(selectIsEventLikeLoading(eventId));
  const toggleLoading = useSelector(selectToggleLoading);
  const userLikedEvents = useSelector(selectUserLikedEvents);
  const userLikedEventIds = useSelector(selectUserLikedEventIds);
  const likedUsers = useSelector(selectUsersWhoLikedEvent(eventId));
  const error = useSelector(selectLikeError);

  useEffect(() => {
    if (userLikedEvents.length === 0) {
      dispatch(fetchUserLikedEvents());
    }
  }, [dispatch, userLikedEvents.length]);

  const toggleLike = useCallback((eventId) => {
    return dispatch(toggleEventLike(eventId)).unwrap();
  }, [dispatch, eventId]);

  const fetchLikedUsers = useCallback((eventId) => {
    return dispatch(fetchEventLikedUsers(eventId)).unwrap();
  }, [dispatch, eventId]);

  const refetchUserLikedEvents = useCallback(() => {
    return dispatch(fetchUserLikedEvents());
  }, [dispatch]);

  return {
    isLiked,
    likeCount,
    isLoading,
    toggleLoading,
    userLikedEvents,
    userLikedEventIds,
    likedUsers,
    error,

    toggleLike,
    fetchLikedUsers,
    refetchUserLikedEvents,
  };
};

export default useLike;
