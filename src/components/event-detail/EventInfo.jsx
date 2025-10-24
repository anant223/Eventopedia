import React from "react";
import { Calendar, Clock, Users, Tag, Globe, PlayCircle, MapPin, Heart, Share2 } from "lucide-react";
import {useParams } from "react-router-dom";
import { AppButton, LoadingSpinner } from "../common";
import { useSelector } from "react-redux";
import { selectEventInfo, selectEvents } from "@/app/selector/virtualEventsSelector";
import eventService from "@/api/eventService";
import useAPI from "@/hooks/useAPI";
import { singleEvent } from "@/app/features/virtualEventsSlice";
import { formatDuration, isExpired } from "../../features/commanAction.js";
import {Like} from "../index"

const EventInfo = () => {
  const {findEventById} =  eventService
  const { id } = useParams();
  const [liked, setLiked] = React.useState(false);
  const events = useSelector(selectEvents);

  const cachedEvent = events?.events.find((e) => e._id === id);
  const { loading, err, refetch } = useAPI(
    () => (!cachedEvent ? findEventById(id) : Promise.resolve(cachedEvent)),
    singleEvent,
    [id],
    (data) => {
      console.log("Transform received:", data);
      return data;
    }
  );

  const event = cachedEvent || useSelector(selectEventInfo);

  const status = isExpired(event?.endDateTime);
  const bgColor = status === "Expired" ? "bg-red-500" : status === "Live" ? "bg-green-500" : "bg-blue-500";



  

  if (loading) return <LoadingSpinner />;
  if (!event) return <div className="text-white">Event not found</div>;

  return (
    <div className="min-h-screen bg-background pt-24 font-roboto">
      <div className="max-w-[960px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 p-4 items-start">
          {/* Left Side - Thumbnail */}
          <div className="w-full lg:w-72 flex-shrink-0 relative">
            <img
              src={event?.image}
              alt={event?.title}
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Event Info */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-6">
              {/* Status + Title */}
              <div className="flex justify-between">
                <div>
                  <span
                    className={`px-3 py-1  rounded-full text-xs font-semibold text-white shadow ${bgColor}`}
                  >
                    {status}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mt-3">
                    {event?.title}
                  </h1>
                </div>
                {/* Share Button */}
                <div>
                  <button className="text-text hover:text-white transition-colors duration-200 bg-background/20 hover:bg-background/40 backdrop-blur-sm p-2 rounded-full border border-white/20 hover:border-white/30 h-10 w-10 sm:h-12 sm:w-12 sm:p-3 min-h-[44px] min-w-[44px]">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              {/* Date / Time / Location */}
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>
                    {new Date(event.startDateTime).toLocaleDateString()} •{" "}
                    {new Date(event.startDateTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>
                    {formatDuration(event?.startDateTime, event?.endDateTime)}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{event?.capacity || 0} Attendees</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Like eventId={id} />
            </div>
            {/* Registration Section */}
            <div className="rounded-2xl p-6 shadow-xl bg-white/5">
              {status === "Expired" ? (
                <>
                  <span className="text-gray-500">
                    This event has successfully ended.
                  </span>
                  <AppButton className="text-text bg-red-500 w-full pointer-events-none">
                    Ended
                  </AppButton>
                </>
              ) : (
                <AppButton buttonStyle={"manual"} className="w-full">
                  {" "}
                  {loading || isSubscribed ? "Registered" : "Register"}
                </AppButton>
              )}
            </div>

            {/* About Event */}
            <div className="">
              <h2 className="text-xl font-bold text-white mb-3">About Event</h2>
              <p className="text-gray-300">{event.desc}</p>
            </div>

            {/* Host Info */}
            <div className="bg-white/5 p-6 shadow-xl rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Hosted By</h2>

              <div className="space-y-4">
                {event?.hosts?.map(({ avatar, email, name, _id }, i) => (
                  <div
                    key={_id}
                    className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition"
                  >
                    <img
                      src={avatar || "/default-avatar.png"}
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <p className="text-white font-medium">{name}</p>
                      <p className="text-sm text-gray-400">{email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
