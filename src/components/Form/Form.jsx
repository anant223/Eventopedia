import { Calendar1Icon, CalendarIcon, MessageCircle, Users, Video } from 'lucide-react';
import React, { useState } from 'react'

const Form = () => {
  const [date, setDate] = useState("")
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (event) => {
    setDate(event.target.value); 
    setShowCalendar(false);
  };

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
          <form className="space-y-6" onSubmit={handleDateSelect}>
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
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar((prev) => !prev)}
                    className={`w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none ${
                      !date ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {date || "Pick a date"}
                  </button>
                  {showCalendar && (
                    <div className="absolute mt-2 bg-gray-800 p-2 rounded shadow-md">
                      <input
                        type="date"
                        onChange={handleDateSelect}
                        className="w-full p-2 bg-gray-700 text-white rounded"
                      />
                    </div>
                  )}
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