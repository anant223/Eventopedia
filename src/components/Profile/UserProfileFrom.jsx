import React, { useState } from 'react'
import {Container} from '../index.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserProfileFrom = ({closeIt}) => {
  const {handleSubmit, register} = useForm();

  const updateProfile = async (data) => {
    const socialLinks = [];

    Object.keys(data).forEach(key => {
      if(key.startsWith("social_") && data[key]){
        const platform = key.replace("social_", "");
        socialLinks.push({platform, url: data[key]})
      }
    });
      const {
        social_discord,
        social_linkedin,
        social_twitter,
        social_instagram,
        ...rest
      } = data;


    const payload = {
      ...rest,
      socialLinks,
    };
    console.log(payload);
      try {
        const response = await axios.put(
          "http://localhost:4000/api/v1/users/update_profile",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Response:", response.data);
        alert("You have updated the profile successfully!");
      } catch (error) {
        console.error("Error:", error);

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
          alert(error.response.data.message || "Something went wrong!");
        } else {
          alert("Failed to upload the image. Please try again later.");
        }
      }
  };
  return (
    <div className="font-roboto ">
      <Container>
        <div className=" sm:bg-white bg-gray-800 sm:bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg px-6 md:p-8 shadow-xl lg:max-w-xl lg:mx-auto h-screen overflow-y-scroll  ">
          <button
            onClick={closeIt}
            aria-label="Close"
            className="absolute top-3 right-3 z-50 text-gray-500 hover:text-gray-600 font-bold text-xl"
          >
            ✕
          </button>

          <form
            onSubmit={handleSubmit(updateProfile)}
            className="space-y-6 relative top-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  value={"abc123"}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  {...register("name")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none h-32"
                  placeholder="Describe yourself"
                  {...register("bio")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  {...register("social_linkedin")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  {...register("social_instagram")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  {...register("social_twitter")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Discord
                </label>
                <input
                  type="url"
                  name="discord"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  {...register("social_discord")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="social_other"
                  className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border-none"
                  {...register("social_other")}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-white text-gray-800 font-semibold hover:bg-gray-300 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default UserProfileFrom