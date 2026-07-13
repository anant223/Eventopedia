import React, { useCallback, useEffect } from "react";
import {
  selectAllBookings,
  selectBookingError,
  selectBookingLoading,
} from "@/app/selector/bookingSelector";
import { useDispatch, useSelector } from "react-redux";
import {myBookingDetail, myBookings} from "@/features/bookingAction";

const useBooking = () => {
  const dispatch = useDispatch();
  const allBookings = useSelector(selectAllBookings);
  const error = useSelector(selectBookingError);
  const loading = useSelector(selectBookingLoading);
  
  useEffect(() => {
    dispatch(myBookings());
  }, [dispatch]);

  const bookingDetail = useCallback((eventId) => {
    dispatch(myBookingDetail(eventId))
  },[dispatch])

  return {allBookings, error, loading, bookingDetail};
};

export default useBooking;
