import React, { useState } from "react";
import { Container, EventCard, EventDetialModel } from "../components/index.js";
import { useSelector } from "react-redux";
import {
  selectEvent,
  selectEventLoading,
} from "../app/selector/virtualEventsSelector.js";
import eventService from "../api/eventService.js";
import { allVirtualEvents } from "../app/features/virtualEventsSlice.js";
import { useQry } from "../hooks/useQry.jsx";

const Events = () => {
  const allPublicEvents = useSelector(selectEvent);
  const isLoading = useSelector(selectEventLoading);
  const [eventData, setEventData] = useState()
  const [state, setState] = useState(false)
  const {loading, error, refetch} = useQry(
    { 
      queryKey : ["Events"],
      apiFn : () => eventService.getAllPublicEvents({page : 1, limit :6}),
      reduxAction : allVirtualEvents,
      options : {}
    }
  )

  const handelEventModel = (status, eventID) =>{
    const chosenPublicEvent = allPublicEvents?.events.find(
      (event) => event._id === eventID
    );
    setEventData(chosenPublicEvent);
    setState(status)
  } 
  

  return (
    <div className="min-h-screen bg-background w-full relative lg:ml-64 md:ml-64 sm:ml-0 ml-0 ">
      <Container>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center text-white">Loading...</div>
          </div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  p-4 pt-12">
            {Array.isArray(allPublicEvents?.events) &&
              allPublicEvents?.events.map((event, index) => (
                <EventCard
                  key={index}
                  openIt={() => handelEventModel(true, event._id)}
                  eventName={event.title}
                  date={new Date(event?.startingDate).toLocaleDateString()}
                  time={new Date(event?.startingDate).toLocaleTimeString()}
                  place={event.status}
                  imgSrc={event?.thumbnail}
                  tag={event?.tag}
                  noOfHour={event?.duration}
                  id={event?._id}
                />
              ))}
          </div>
        )}

        {/* Modal */}
        {state && (
          <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center py-8">
              <EventDetialModel
                {...eventData}
                closeIt={() => handelEventModel(false)}
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Events;