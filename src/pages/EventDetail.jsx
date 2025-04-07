import React from 'react'
import { Container, EventDetialModel } from '../components'
const EventDetail = () => {
  return (
    <div className="py-24 bg-gray-800 flex w-full min-h-screen font-roboto">
      <div className="mx-auto px-4 md:px-8 lg:px-12">
        <div>
          <EventDetialModel />
        </div>
      </div>
    </div>
  );
}

export default EventDetail