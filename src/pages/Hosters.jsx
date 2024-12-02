import React from "react";
import { Card, EventSidebar } from "../components/index.js";
import img from "../assets/chat1.jpg";

const Hosters = () => {
  return (
    <div className=" w-full min-h-screen bg-gray-900 text-white py-24 ">
      <div className="flex">
        <div className=" w-64 hidden md:block">
          <EventSidebar />
        </div>
        <div className="pr-4 md:pr-8 lg:pr-16 pl-2 md:pl-4 lg:pl-12 relative flex-1 overflow-hidden ">
          <div className=" w-full  grid grid-cols-3 gap-4">
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
            <Card
              img={img}
              name="Ashik"
              number="4.8"
              numerOfEvents="258"
            />{" "}
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />{" "}
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />{" "}
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hosters;
