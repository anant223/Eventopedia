import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrganizedEvents,
  selectAttendedEvents,
} from "@/app/selector/authSelector";
import { fetchHistory } from "@/features/authActions";

const useHistory = () => {
  const dispatch = useDispatch();
  const organizedEvents = useSelector(selectOrganizedEvents);
  const attendedEvents = useSelector(selectAttendedEvents);

  useEffect(() => {
      dispatch(fetchHistory());
  }, [dispatch]);

  return {
    organizedEvents,
    attendedEvents,
  };
};

export default useHistory;
