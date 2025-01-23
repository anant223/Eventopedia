import React from 'react'
import { Container, EventDetialModel } from '../components'
const EventDetail = () => {
  return (
    <div className="py-24 bg-gray-800 flex w-full min-h-screen font-roboto">
      <Container>
        <div>
          <EventDetialModel />
        </div>
      </Container>
    </div>
  );
}

export default EventDetail