import React from "react";
import { Container, EventCard } from "../components/index.js";
import img from "../assets/chat2.jpg";

const Events = () => {
    return (
        <div className=" bg-gray-800 w-full min-h-screen py-24">
            <Container>
                <div className=" lg:px-4 ">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <EventCard
                            eventName="Tech Conference 2024"
                            noOfPeople="255"
                            place="Online"
                            imgSrc={img}
                            date={new Date().toLocaleDateString()}
                        />
                        <EventCard
                            eventName="Tech Conference 2024"
                            noOfPeople="255"
                            place="Online"
                            imgSrc={img}
                            date={new Date().toLocaleDateString()}
                        />
                        <EventCard
                            eventName="Tech Conference 2024"
                            noOfPeople="255"
                            place="Online"
                            imgSrc={img}
                            date={new Date().toLocaleDateString()}
                        />
                        <EventCard
                            eventName="Tech Conference 2024"
                            noOfPeople="255"
                            place="Online"
                            imgSrc={img}
                            date={new Date().toLocaleDateString()}
                        />
                        <EventCard
                            eventName="Tech Conference 2024"
                            noOfPeople="255"
                            place="Online"
                            imgSrc={img}
                            date={new Date().toLocaleDateString()}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Events;
