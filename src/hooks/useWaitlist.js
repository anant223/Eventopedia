import { createWaitlist } from '@/features/waitlistAction'
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useWaitlist = () => {
  const dispatch = useDispatch();

  const { error, loading, email } = useSelector((state) => state.waitlist);

  const joinWaitlist = useCallback(
    async (email) => {
      return await dispatch(createWaitlist({ email })).unwrap();
    },
    [dispatch]
  );

  return {
    joinWaitlist,
    error,
    loading,
    email
  };
};

export default useWaitlist;

