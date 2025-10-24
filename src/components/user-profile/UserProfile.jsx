import React, { useEffect } from "react";
import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Calendar,
  Edit2,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserOrganizedHistory, selectUserAttendedHistory } from "@/app/selector/authSelector";
import useAPI from "@/hooks/useAPI";
import userService from "@/api/userService";
import {setUserEvents} from "@/app/features/authSlice";
import { EventHistoryCard } from "../all-events";
const iconMap = {
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
  youtube: <Youtube size={18} />,
  other: <Globe size={18} />,
};
const Profile = () => {
  const {userHistory} = userService
  const user = useSelector(selectUser);
  const organizedEventHistory = useSelector(selectUserOrganizedHistory);
  const attendedEventHistory = useSelector(selectUserAttendedHistory);
  const { history, avatar, name, username,createdAt} = user?.data?.data;
  const navigate = useNavigate();
  const { loading, err, refetch } = useAPI(
    userHistory,
    setUserEvents,
    [],
    (data) => {
      console.log(data); 
      return data;
    }
  );
  console.log("or",organizedEventHistory)
  console.log("att", attendedEventHistory)

  return (
    <div className="min-h-screen bg-background text-text pt-20 sm:pt-24 font-roboto pb-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={avatar || "/placeholder.svg"}
                alt="usr"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 object-cover shadow-lg"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl capitalize md:text-2xl font-semibold break-words">
                {name}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base break-all">
                @{username}
              </p>

              {/* Bio + Details */}
              <div className="flex flex-col mt-2 gap-2">
                {/* Bio */}
                {user.bio && (
                  <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                )}

                {/* Joined */}
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm capitalize">
                    Joined {new Date(createdAt).toDateString()}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-6 justify-center sm:justify-start text-gray-400">
                  <span className="font-medium">
                    {user?.data?.data?.history.organizedEvent.length}{" "}
                    <span className="font-normal">Hosted</span>
                  </span>
                  <span className="font-medium">
                    {history.attendedEvent.length}{" "}
                    <span className="font-normal">Attended</span>
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 justify-center sm:justify-start text-gray-500">
                  {user?.data?.data?.socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      to={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-gray-300 transition-colors"
                    >
                      {iconMap[social.platform]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex-shrink-0 self-start absolute right-0 sm:relative">
              <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Edit2 size={14} />
              </button>
            </div>
          </div>
        </div>
        {/* Hosting Section */}
        <div className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Hosting</h2>
          {attendedEventHistory?.map((event, index) => (
            <EventHistoryCard
              key={event._id}
              imgUrl={event.image}
              title={event.title}
              id={event._id}
              hosts={event.hosts}
              date={event.startDateTime}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Attended</h2>
          {attendedEventHistory?.map((event, index) => (
            <EventHistoryCard
              key={event._id}
              imgUrl={event.image}
              title={event.title}
              id={event._id}
              hosts={event.hosts}
              date={event.startDateTime}
            />
          ))}
        </div>
        {/* Past Events */}
        <div className="mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Organized Events
            </h2>
            <button
              onClick={() => navigate("main/all")}
              className="text-blue-400 text-sm hover:underline self-start sm:self-auto"
            >
              View All
            </button>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {organizedEventHistory?.map((event, idx) => (
              <EventHistoryCard
                key={event._id}
                imgUrl={event.image}
                title={event.title}
                id={event._id}
                hosts={event.hosts}
                date={event.startDateTime}
                {...event}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
