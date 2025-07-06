import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSubscribeEvent } from '../../features/registerEventAction';
import registerService from '../../api/registerService';
import { setSubscribedEvents } from '../../app/features/registerSlice';
import useAPI from '../../hooks/useAPI';
import {selectIsSubscribed} from '../../app/selector/registerSelector';

const SubscribeButton = ({eventId}) => {
  const dispatch = useDispatch();
  const { loading, err } = useAPI(
    () => registerService.registredEvents(),
    setSubscribedEvents,
    [],
    (data) => Object.fromEntries(
      data.map(({event, ...rest}) => [event._id,  rest ])
    )
  );
  const isSubscribed = useSelector(selectIsSubscribed(eventId));

  return (
    <div>
      <button
        onClick={() => dispatch(toggleSubscribeEvent(eventId))}
        className="bg-primary hover:bg-primary/90 text-black py-2 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-primary/50 transform hover:-translate-y-0.5"
      >
        {loading || isSubscribed ? "Registered" : "Register"}
      </button>
    </div>
  );
}

export default SubscribeButton