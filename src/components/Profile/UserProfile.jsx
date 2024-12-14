import { Camera, CameraIcon, EditIcon, Link } from "lucide-react";
import React from "react";
import { RiDeleteBin6Fill, RiDiscordFill, RiInstagramFill, RiLinkedinBoxFill,  RiTwitterXFill} from "react-icons/ri";
import {Container, Tag} from "../index.js";
import { useNavigate } from "react-router-dom";


const UserProfile = ({openIt}) => {
  const navigate = useNavigate()
  const user = {
    avatar: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "I love attending virtual events and connecting with like-minded people!",
    joined: "January 2024",
    eventsHosted: 10,
    eventsJoined: 25,
  };

  return (
    <div className="rounded-lg overflow-hidden font-roboto text-white ">
      <Container>
        <div>
          <div className="flex gap-4  py-4 justify-between">
            <div className="flex lg:items-center lg:flex-row flex-col gap-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 group">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className=" w-full h-full rounded-full ring-2 ring-white shadow-md object-cover"
                />
                  <input
                    type="file"
                    name="upload"
                    id="file-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute inset-0 bg-gray-500/60 hover:bg-gray-600/70 rounded-full text-white flex items-center justify-center cursor-pointer group-hover:opacity-40 opacity-0"
                  >
                    <CameraIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                  </label>
              </div>
              <div>
                <h1 className=" text-3xl font-bold">Anant223</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  Event Enthusiast
                </p>
              </div>
            </div>
            <div className="mt-1 flex flex-col justify-between">
              <button
                onClick={openIt}
                className="flex items-center text-xs gap-1 justify-end"
              >
                <EditIcon size={12} /> Edit Profile
              </button>
              <a href="#" className="flex items-center gap-1">
                <Link size={18} /> https://anant-self.vercel.app
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-base space-y-4 py-4">
            <div>
              <span className="bg-gray-100 rounded-full leading-5 px-2 text-sm text-black ">
                Joined {user.joined}
              </span>
            </div>
            <div className="flex gap-2 text-xs">
              <Tag title="Instagarm" icon={<RiInstagramFill size={18} />} />
              <Tag title="LinkedIn" icon={<RiLinkedinBoxFill size={18} />} />
              <Tag title="Twitter" icon={<RiTwitterXFill size={18} />} />
              <Tag title="Discord" icon={<RiDiscordFill size={18} />} />
            </div>
            <div>
              <p className=" text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className=" grid gap-4">
              <div className="bg-gray-600 w-full flex flex-col items-center justify-center px-4 py-8 rounded space-y-4">
                <span className="text-xl font-semibold">Event Hosted</span>
                <span className=" ring-8 ring-indigo-400 rounded-full text-2xl p-12">
                  {0}
                </span>
              </div>
              <div className="bg-gray-600 w-full flex flex-col items-center      justify-center px-4 py-8 rounded space-y-4">
                <div className=" text-xl font-semibold">Event Joined</div>
                <div className=" ring-8 ring-indigo-400 text-2xl rounded-full p-12">
                  {0}
                </div>
              </div>
              <div className=" overflow-x-auto flex border-t w-full py-4 justify-end">
                <button className="bg-red-500 text-white px-4 rounded flex items-center gap-2 py-2">
                  <RiDeleteBin6Fill />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
