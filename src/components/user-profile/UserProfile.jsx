import { useEffect, useState } from "react"
import { Linkedin, Twitter, Instagram, Youtube, Globe, Calendar, Edit2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { EventHistoryCard } from "../events-ui"
import ProfileEditModal from "./UserProfileFrom"
import {LoadingSpinner } from "../common"
import useAuth from "@/hooks/useAuth"
import useHistory from "@/hooks/useHistory"

const iconMap = {
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
  youtube: <Youtube size={18} />,
  other: <Globe size={18} />,
}

const Profile = ({paramId}) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {user} = useAuth() 
  const { organizedEvents, attendedEvents } = useHistory();


  if (!user) return <LoadingSpinner />;
  const {avatar, name, username, createdAt, _id, socialLinks} = user;

  return (
    <div className="min-h-screen bg-background text-text pt-20 sm:pt-24 font-roboto pb-8">
      <div className="max-w-[40rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="flex-shrink-0">
              <img
                src={avatar || "/placeholder.svg"}
                alt="usr"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 object-cover shadow-lg"
              />
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-2 justify-between">
                <h2 className="text-lg sm:text-xl capitalize md:text-2xl font-semibold break-words">
                  {name}
                </h2>
               {_id === paramId && <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition-colors rounded-full"
                >
                  <Edit2 size={14} />
                  Edit
                </button>}
              </div>
              <p className="text-gray-500 text-sm sm:text-base break-all">
                @{username}
              </p>

              {/* Bio + Details */}
              <div className="flex flex-col mt-2 gap-2">
                {/* Bio
                {user.bio && (
                  <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                )} */}

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
                    {organizedEvents.length}{" "}
                    <span className="font-normal">Hosted</span>
                  </span>
                  <span className="font-medium">
                    {attendedEvents.length}{" "}
                    <span className="font-normal">Attended</span>
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 justify-center sm:justify-start text-gray-500">
                  {socialLinks.map((social, index) => (
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
          </div>
        </div>
        <div className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Hosting</h2>
          
        </div>
        <div className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Attended</h2>
          {attendedEvents?.map((event, index) => (
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
            {organizedEvents?.map((event, idx) => (
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

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={{
          name: user.name || "",
          bio: user.bio || "",
          avatar: user.avatar || "",
          socialLinks: user.socialLinks || [],
        }}
      />
    </div>
  );
}

export default Profile
