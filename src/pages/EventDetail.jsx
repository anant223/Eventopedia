import React from 'react'
import {EventInfo} from '../components/index'
const Event = () => {
const sampleEvent = {
  title: "Tech Innovators Summit 2025",
  desc: "Join industry leaders and enthusiasts as we explore the future of AI, blockchain, and cloud computing. Expect keynotes, networking, and hands-on workshops.",
  thumbnail:
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
  duration: "2 hours",
  category: "tech",
  startingDate: "2025-09-15T10:00:00Z",
  time: "10:00 AM",
  url: "https://eventopedia.com/events/tech-summit-2025",
  participants: [
    "64a7b5f2c1234f890a12bc34",
    "64a7b5f2c1234f890a12bc35",
    "64a7b5f2c1234f890a12bc36",
  ],
  tag: "AI & Cloud",
  status: "upcoming",
  host: "64a7b5f2c1234f890a12bc99",
  eventType: "public",
};
  return (
    <div className=' min-h-screen bg-background'>
      <EventInfo/>
    </div>
  );
}

export default Event