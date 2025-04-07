import React from "react";
import { Card, Container, EventSidebar } from "../components/index.js";
import img from "../assets/chat1.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../app/selector/authSelector.js";


const Hosters = () => {
  const user = useSelector(selectUser)
  console.log(user);
  return (
    <div className=" ml-64 w-full min-h-screen bg-background text-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  p-4 pt-12">
          <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
          <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
          <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />{" "}
          <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />{" "}
          <Card img={img} name="Ashik" number="4.8" numerOfEvents="258" />
        </div>
      </Container>
    </div>
  );
};

export default Hosters;
