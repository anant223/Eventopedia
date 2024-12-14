import React, { useState } from 'react'
import {Container} from '../index.js';

const UserProfileFrom = ({closeIt}) => {
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

          <form className="space-y-6 relative top-6">
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