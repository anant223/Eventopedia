import { Badge, Camera, CameraIcon, EditIcon, Link } from "lucide-react";
import React from "react";
import { RiDeleteBin6Fill, RiDiscordFill, RiInstagramFill, RiLinkedinBoxFill,  RiTwitterXFill} from "react-icons/ri";
import {Container, Tag, UploadAvatar} from "../index.js";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/Authentication/authSelector.js";
import { useSelector } from "react-redux";

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
    <div className="rounded-lg overflow-hidden font-roboto text-white">
      <Container>
        <div>
          <div className="flex gap-4 py-4 justify-between">
            <div className="flex lg:items-center lg:flex-row flex-col gap-4">
              <UploadAvatar 
                imgUrl={userData?.data?.avatar}
              />
              <div>
                <h1 className=" text-3xl font-bold capitalize">
                  {userData?.data?.name}
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  Event Enthusiast
                </p>
              </div>
            </div>
            <div className="mt-1 flex flex-col justify-between">
              <button
                onClick={openIt}
                className="flex items-center text-sm gap-1 justify-end"
              >
                <EditIcon size={16} /> Edit Profile
              </button>
              <a href="#" className="flex items-center gap-1">
                <Link size={18} /> {userData?.data?.socialLinks?.find(link => link.platform === "other").url}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-base space-y-4 py-4">
            <div>
              <span className="bg-gray-100 rounded-full leading-5 px-3 text-black font-bold text-base ">
                Joined{" "}
                {new Date(userData?.data?.createdAt).toLocaleString("eng", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex gap-2 text-xs capitalize">
              {userData?.data?.socialLinks
                ?.filter((link) => link.platform !== "other")
                .map((link, index) => (
                  <Tag key={index} title={link.platform} href={link.url} icon={platformIcons[link.platform]} />
                ))}
            </div>
            <div>
              <p className=" text-justify text-xl">{userData?.data?.bio}</p>
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
