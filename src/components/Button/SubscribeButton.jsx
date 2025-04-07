import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerEvent } from '../../features/virtualEvents/registerEvent'
import useRegister from '../../hooks/useRegister'

const SubscribeButton = ({eventId}) => {
  const dispatch =  useDispatch()
  const {loading} = useRegister(eventId);
  const isSubscribed = useSelector((state) => state.auth.subscriptions.includes(eventId));
  

  return (
    <div>
      <button
        onClick={() => dispatch(registerEvent(eventId))}
        className="bg-primary hover:bg-primary/90 text-black py-2 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-primary/50 transform hover:-translate-y-0.5"
      >
        {isSubscribed ? "Registered" : "Register"}
      </button>
    </div>
  );
}

export default SubscribeButton