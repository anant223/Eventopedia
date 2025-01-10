import React from "react";
import { Container, EventCard } from "../components/index.js";
import img from "../assets/chat2.jpg";

const Events = () => {
    return (
        <div className=" bg-gray-800 w-full min-h-screen py-24 relative flex-1">
            <Container>
                <div className="">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 inset-0 px-4 overflow-hidden">
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
