import {CalendarIcon, MessageCircle, Users, Video } from 'lucide-react';
import React, { useState } from 'react'
const Form = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });


  
  return (
    <div className="font-roboto">
      <div className="lg:grid lg:grid-cols-3 gap-8">
        <div className=" col-span-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <div className=" text-center mb-4 font-roboto">
            <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-gray-200 mb-2 ">
              Create Your Event
            </h2>
            <p className="lg:text-xl text-lg text-gray-200">
              Bring people together and share your knowledge
            </p>
          </div>
          <form className="space-y-6" >
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Name
                </label>
                <div>
                  <input
                    type="text"
                    name="title"
                    className="w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                    placeholder="Event Name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Type
                </label>
                <div>
                  <select className="w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none">
                    <option value="group" disabled>
                      Meeting Type
                    </option>
                    <option value="group">Group Meeting</option>
                    <option value="oneOnOne">One-on-One Session</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Event Date
                </label>
               
<div class="relative max-w-sm">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
  </div>
  <input id="datepicker-autohide" datepicker datepicker-autohide type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
</div>

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Max Participants
                </label>
                <div>
                  <input
                    type="number"
                    name="title"
                    className="w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                    placeholder="Enter Max Participants"
                  />
                </div>
              </div>
              <div className=" col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Description
                </label>
                <div>
                  <textarea
                    className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400 h-32 p-4 rounded"
                    placeholder="Describe your event"
                  />
                </div>
              </div>
              <div className=" col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Tag
                </label>
                <div>
                  <input
                    type="text"
                    className="w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  />
                </div>
              </div>
              <div className=" col-span-2">
                <button className="w-full py-2 rounded bg-white  font-semibold">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="text-white lg:mt-0 mt-8">
          <div className="mb-8 backdrop-filter bg-white bg-opacity-10  shadow-lg rounded-lg px-4 py-6">
            <ul className=" space-y-4">
              <li className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-200" />
                Define your target audience
              </li>
              <li className="flex items-center">
                <Video className="w-5 h-5 mr-2 text-green-400" />
                Test your audio and video setup
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                Encourage participant interaction
              </li>
              <li className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-pink-400" />
                Send reminders before the event
              </li>
            </ul>
          </div>
          <div className="mb-8  bg-white bg-opacity-10 backdrop-filter  shadow-lg rounded-lg px-4 py-6">
            <ul>
              <h2 className="text-xl font-semibold text-white mb-4">
                Need Help?
              </h2>
              <p className="text-gray-200 mb-4">
                Our support team is here to assist you in creating the perfect
                event.
              </p>

              <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-2 rounded">
                Contact Support
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form