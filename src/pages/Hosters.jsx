import React from "react";
import { Card, Container, EventSidebar } from "../components/index.js";
import img from "../assets/chat1.jpg";


const Hosters = () => {
  return (
    <div className=" w-full min-h-screen bg-gray-800 text-white py-24">
      <Container>
        <div className=" flex-1 overflow-hidden ">
          <div className=" w-full  grid grid-cols-3 gap-4">
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
