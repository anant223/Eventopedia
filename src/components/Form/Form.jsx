import axios from 'axios';
import {CalendarIcon, MessageCircle, Users, Video } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { eventService } from '../../api/event';
const Form = () => {
  const { handleSubmit, register} = useForm();
  const newEvent = async (data) => {
    try {
      // Debug: Log the incoming file
      console.log("Incoming thumbnail:", data.thumbnail[0]);

      const formData = new FormData();

      if (!data.thumbnail?.[0]) {
        throw new Error("No thumbnail file selected");
      }
      console.log(data);
      // Append file with explicit filename
      formData.append("thumbnail", data.thumbnail[0]);
      formData.append("tag", data.tag);
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("duration", data.duration);
      formData.append("startingDate", data.startingDate);
      formData.append("url", data.url);
      formData.append("eventType", data.eventType);

      // Debug: Log FormData contents
      formData.forEach((value, key) => {
        if (key === "thumbnail") {
          console.log("thumbnail details:", {
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          console.log(`${key}:`, value);
        }
      });

      // Modify your eventService call
      const response = await eventService.createEvent(formData, {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      });

      alert("Event has been created successfully");
      console.log(response);
    } catch (error) {
      console.error("Error creating event:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  return (
    <div className="font-roboto">
      <div className="lg:grid lg:grid-cols-3 gap-8">
        <div className=" col-span-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <div className="text-center mb-4 font-roboto">
            <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-gray-200 mb-2 ">
              Create Your Event
            </h2>
            <p className="lg:text-xl text-lg text-gray-200">
              Bring people together and share your knowledge
            </p>
          </div>
          <form onSubmit={handleSubmit(newEvent)} className="space-y-6">
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Title
                </label>
                <div>
                  <input
                    type="text"
                    name="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("title", { required: true })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Type
                </label>
                <div>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("eventType", { required: true })}
                  >
                    <option disabled value="">
                      Select Type
                    </option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Date
                </label>
                <div>
                  <input
                    type="datetime-local"
                    name="eventDayTime"
                    className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("startingDate", { required: true })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Duration
                </label>
                <div>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("duration", { required: true })}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image
                </label>
                <div>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 px-4 py-3"
                    type="file"
                    {...register("thumbnail", { required: true })}
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
                    {...register("desc", { required: true })}
                  />
                </div>
              </div>
              <div className=" col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event URL
                </label>
                <div>
                  <input
                    type="url"
                    className="w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                    {...register("url", { required: true })}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Event Tag
                </label>
                <div>
                  <input
                    type="text"
                    className="w-full text-left px-4 py-2 bg-white bg-opacity-20"
                    {...register("tag", {required: true})}
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