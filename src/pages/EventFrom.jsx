import React from 'react'
import { Container, Form } from '../components/index.js';
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventFrom = () => {
  return (
    <div className=" bg-gray-800 flex w-full min-h-screen font-roboto">
      <Container>
        <div className=" p-4 pt-12">
          <div className=" text-white  space-y-4 ">
            <Link
              to="/main/all-events"
              className="flex items-center bg-gray-600 rounded p-2 lg:w-24 lg:h-12 w-16 h-6 shadow-2xl"
            >
              <MoveLeft className="mr-2" />
              Back
            </Link>
          </div>
          <div className="mt-4">
            <Form />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EventFrom