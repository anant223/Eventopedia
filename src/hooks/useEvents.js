import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  updateCoHost,
  inviteUsers,
  activateEvent,
  cancelEvent,
  respondInvitation
} from "@/features/eventActions";
import {
  selectAllEvents,
  selectCurrentEvent,
  selectEventLoading,
  selectCreateLoading,
  selectUpdateLoading,
  selectDeleteLoading,
  selectEventError,
  selectPastEvents,
  selectHostLoading,
  selectStatusLoading,
  selectInviteLoading,
  selectEventCategories,
  selectEventsByLocation,
  selectPopularEvents
} from "@/app/selector/eventsSelector";

const useEvents = () => {
    const dispatch = useDispatch();
    const events = useSelector(selectAllEvents);
    const currentEvent = useSelector(selectCurrentEvent);
    const loading = useSelector(selectEventLoading);
    const createLoading = useSelector(selectCreateLoading);
    const updateLoading = useSelector(selectUpdateLoading);
    const deleteLoading = useSelector(selectDeleteLoading);
    const error = useSelector(selectEventError);
    const pastEvents = useSelector(selectPastEvents)
    const cohostLoading = useSelector(selectHostLoading);
    const invitationLoading = useSelector(selectInviteLoading);
    const statusLoading = useSelector(selectStatusLoading);

    
    
    useEffect(() => {
        if(events.length === 0 && !loading){
            // console.log(events)
            dispatch(fetchAllEvents())
        }
    }, [dispatch, events.length, loading]);

    const refetchEvent = useCallback(() => {
      return dispatch(fetchAllEvents()).unwrap();
    }, [dispatch])
    const create = useCallback((data) => {
        return dispatch(createEvent(data)).unwrap();
    }, [dispatch])
     const getEventById = useCallback((id) => {
       return dispatch(fetchEventById(id)).unwrap();
     }, [dispatch]);
    const update = useCallback((data, id) => {
        return dispatch(updateEvent({eventId: id, data})).unwrap()
    },[dispatch])
    const delEvent = useCallback((id) => {
      return dispatch(deleteEvent(id)).unwrap();
    },[dispatch]);
    const cohost = useCallback(
      ({eventId, data}) => {
        return dispatch(updateCoHost({eventId, data}))
      },
      [dispatch]
    );

     const invitations  = useCallback(
      ({eventId, data}) => {
        return dispatch(inviteUsers({eventId, data}))
      },
      [dispatch]
    );

     const cancel = useCallback(
      (eventId) => {
        return dispatch(cancelEvent({eventId}))
      },
      [dispatch]
    );

     const activate = useCallback(
      (eventId) => {
        return dispatch(activateEvent(eventId))
      },
      [dispatch]
    );

     const userConfimation  = useCallback(
      ({eventId, data}) => {
        return dispatch(respondInvitation({eventId, data}))
      },
      [dispatch]
    );

    return {
      events,
      currentEvent,
      loading,
      createLoading,
      updateLoading,
      deleteLoading,
      error,
      getEventById,
      update,
      create,
      delEvent,
      refetchEvent,
      cohost,
      activate,
      cancel,
      invitations,
      userConfimation,
      cohostLoading,
      statusLoading,
      invitationLoading,
      pastEvents
    };

    

};

export default useEvents;

