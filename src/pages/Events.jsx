import React, { useState, useEffect } from "react";
import { Container, EventCard, EventDetialModel } from "../components/index.js";
import img from "../assets/chat2.jpg";
import { eventService } from "../api/event.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEvent,
  selectEventLoading,
} from "../features/AllVirtualEvents/virtualEventsSelector.js";
import { allVirtualEvents } from "../features/AllVirtualEvents/virtualEventsSlice.js";

const Events = () => {
  const dispatch = useDispatch();
  const allPublicEvents = useSelector(selectEvent);
  const isLoading = useSelector(selectEventLoading);
  const [eventData, setEventData] = useState()
  const [state, setState] = useState(false)
  const [error, setError] = useState(null);

  const handelEventModel = (status, eventID) =>{
  const chosenPublicEvent = allPublicEvents?.data?.events.find(
    (event) => event._id === eventID
  );
  console.log(chosenPublicEvent);
    setEventData(chosenPublicEvent);
    setState(status)
  } 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const publicEvent = await eventService.getAllPublicEvents({
          page: 1,
          limit: 6,
        });
        if (publicEvent) {
          dispatch(allVirtualEvents(publicEvent));
        }
      } catch (err) {
        console.error("Error fetching public events:", err);
        setError("Failed to load events. Please try again later.");
      }
    };

    fetchEvents();
  }, [dispatch]);
  return (
    <div className="bg-gray-800 w-full min-h-screen py-24 relative flex-1">
      <Container>
        {isLoading ? (
          <div className=" text-center text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-4">
            {Array.isArray(allPublicEvents?.data?.events) &&
              allPublicEvents?.data?.events.map((event, index) => (
                <EventCard
                  openIt ={() => handelEventModel(true, event._id)}
                  key={index}
                  eventName={event.title}
                  date={new Date(event?.startingDate).toLocaleDateString()}
                  place={event.status}
                  imgSrc={event?.thumbnail}
                  tag={event?.tag}
                  noOfHour={event?.duration}
                />
              ))}
            {state? <div className=" fixed none top-0 w-full h-full overflow-auto left-10 bg-black bg-opacity-40 flex justify-center pt-[5.5rem]">
              <EventDetialModel
                {...eventData}
                closeIt={() => handelEventModel(false)}
              />
            </div> : null}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Events;
