import React from "react";
import { Card, Container, EventSidebar } from "../components/index.js";
import img from "../assets/chat1.jpg";


const Hosters = () => {
  return (
    <div className=" w-full min-h-screen bg-gray-800 text-white py-24">
      <Container>
        <div className=" ">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 inset-0 px-4 overflow-hidden">
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
            <Card
              img={img}
              name="Ashik"
              number="4.8"
              numerOfEvents="258"
            />{" "}
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />{" "}
            <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hosters;
