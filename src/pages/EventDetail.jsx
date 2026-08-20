import React from 'react'
import EventReadPage from "@/event-detail/eventPage"
import { useParams } from 'react-router-dom';
const Event = () => {
  const {id} = useParams()
  return (
    <div className='w-full h-full overflow-y-auto'>
      <EventReadPage eventId={id} />
    </div>
  );
};

export default Event