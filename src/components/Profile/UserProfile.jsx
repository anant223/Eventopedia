import { Badge, Camera, CameraIcon, EditIcon, Link2 } from "lucide-react";
import React from "react";
import { RiDeleteBin6Fill, RiDiscordFill, RiInstagramFill, RiLinkedinBoxFill,  RiTwitterXFill} from "react-icons/ri";
import {Container, Tag, UploadAvatar} from "../index.js";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../app/selector/authSelector.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = ({openIt}) => {
  const userData = useSelector(selectUser)
  const platformIcons = {
    twitter: <RiTwitterXFill />,
    instagram: <RiInstagramFill />,
    linkedin: <RiLinkedinBoxFill />,
  };

  return !userData?.data ? (
    <div> Loading</div>
  ) : (
    <div className="rounded-lg overflow-hidden font-roboto bg-transparent text-text shadow-xl">
      <div className="max-w-7xl px-4 md:px-8 lg:px-12">
        <div>
          {/* header */}
          <div className=" flex gap-[20px] flex-wrap">
            <div className="grow p-2 ">
              <div className="flex items-center gap-4">
                <UploadAvatar imgUrl={userData?.data?.data?.avatar} />
                <div className="flex flex-col">
                  {/* Name */}
                  <h1 className="text-3xl font-bold text-text text-left capitalize pl-2">
                    {userData?.data?.data?.name}
                  </h1>

                  {/* Event Enthusiast Tagline */}
                  <p className="text-sm text-gray-500 italic pl-2">
                    Event Enthusiast
                  </p>

                  {/* Joined Date */}
                  <div className="mt-2">
                    <span className="bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-700">
                      Joined{" "}
                      {new Date(userData?.data?.data?.createdAt).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grow p-2">
              <div className="flex flex-col h-full justify-between">
                <button
                  onClick={openIt}
                  className="flex items-center text-sm justify-end gap-2"
                >
                  <EditIcon size={16} /> Edit Profile
                </button>
                <Link to="#" className=" hidden lg:flex justify-end gap-2">
                  <Link2 size={16} />
                  {userData?.data?.data?.socialLinks?.find(
                    (link) => link.platform === "other"
                  )?.url || ""}
                </Link>
              </div>
            </div>
            <div className="w-full">
              <div className="flex gap-2 text-xs capitalize py-4">
                {userData?.data?.data?.socialLinks
                  ?.filter((link) => link.platform !== "other")
                  .map((link, index) => (
                    <Tag
                      key={index}
                      title={link.platform}
                      href={link.url}
                      icon={platformIcons[link.platform]}
                    />
                  ))}
              </div>
            </div>
            {/* bio */}
            <div className=" w-full">
              <div className=" py-4">
                <p className=" text-justify text-xl">
                  {userData?.data?.data?.bio}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-wrap flex gap-[20px] w-full">
            <div className="grow w-1/2">
              <div className="bg-gray-600 w-full flex flex-col items-center justify-center px-4 py-8 rounded space-y-4">
                <span className="text-xl font-semibold">Event Hosted</span>
                <span className=" ring-8 ring-indigo-400 rounded-full text-2xl p-12">
                  {0}
                </span>
              </div>
            </div>
            <div className="grow w-1/2">
              <div className="bg-gray-600 w-full flex flex-col items-center      justify-center px-4 py-8 rounded space-y-4">
                <div className=" text-xl font-semibold">Event Joined</div>
                <div className=" ring-8 ring-indigo-400 text-2xl rounded-full p-12">
                  {0}
                </div>
              </div>
            </div>
          </div>
          <div className=" border-t-0 overflow-hidden mt-2"></div>
          <div className=" overflow-x-auto flex border-t w-full py-4 justify-end">
            <button className="bg-red-500 text-white px-4 rounded flex items-center gap-2 py-2">
              <RiDeleteBin6Fill />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default UserProfile;
