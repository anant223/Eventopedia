import React, {useEffect} from "react";
import { Calendar, Clock, Users, MapPin, Trash2Icon, MoreVertical, Share, Clipboard } from "lucide-react";
import {useNavigate, useParams } from "react-router-dom";
import { AppButton, LoadingSpinner } from "../common";
import { formatDuration, isExpired } from "@/utils/commanAction.js";
import {Like} from "../index"
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { loadStripe } from "@stripe/stripe-js";
import useEvents from "@/hooks/useEvents";
import useEnroll from "@/hooks/useEnroll";
import useAuth from "@/hooks/useAuth";
import usePayment from "@/hooks/usePayment";

const stripe_client_key = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const EventInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const {user} = useAuth();
  const {getEventById, delEvent, loading, currentEvent, activate} = useEvents();
  const {isRegistered, toggleRegistration} = useEnroll(id)
  const {createIntent} = usePayment()


  useEffect(() => {
    if (!id) return;
    getEventById(id);
  },[]);

  
  const options = {
    stripe_client_key,
    appearance: {
      theme: "stripe",
    },
  };

  console.log(currentEvent)
  const handleDelete = async () => {
    try {
      await delEvent(id);
      toast.success("Event deleted successfully!");
      navigate("/main/all-events");
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    }
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
  }

  const handleRegister = async () => {
    try {
      if(currentEvent.ticketType === "free"){
        await toggleRegistration(id);
        toast.success("Event registered successfully!");
      }else {
        await createIntent({eventId: id, ticketQuantity: 1})
        navigate("main/checkout");
        return;
      }    
    } catch (error) {
      toast.error(error.message || "Failed to toggle");
    }
  }

  const status = isExpired(currentEvent?.endDateTime);
  const bgColor = status === "Expired" ? "bg-red-500" : status === "Live" ? "bg-green-500" : "bg-blue-500";

 
  if (loading) return <LoadingSpinner />;
  if (!currentEvent) return <div className="text-white">Event not found</div>;

  const isHost = currentEvent?.hosts?.some((host) => host._id === user?._id);

  console.log(currentEvent)
  return (
    <div className="min-h-screen bg-background pt-24 font-roboto">
      <div className="max-w-[960px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 p-4 items-start">
          {/* Left Side - Thumbnail */}
          <div className="w-full lg:w-72 flex-shrink-0 relative">
            <img
              src={currentEvent?.image}
              alt={currentEvent?.title}
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
                    {currentEvent?.title}
                  </h1>
                </div>
                {/* Share Button */}
                <div className="space-x-2">
                  {isHost ? (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size={"default"}
                          className="bg-gray-800 hover:bg-gray-700"
                        >
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 border-gray-700"
                      >
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={handleShare}
                          >
                            <Share size={18} />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            variant="destructive"
                            className="text-red-500 hover:text-red-500"
                            onClick={handleDelete}
                          >
                            <Trash2Icon />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      onClick={handleShare}
                      className="bg-gray-800 hover:bg-gray-700"
                    >
                      <Clipboard size={18} />
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>
                    {new Date(currentEvent.startDateTime).toLocaleDateString()}{" "}
                    •{" "}
                    {new Date(currentEvent.startDateTime).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>
                    {formatDuration(
                      currentEvent?.startDateTime,
                      currentEvent?.endDateTime
                    )}
                  </span>
                </div>
                {currentEvent?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{currentEvent?.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{currentEvent?.capacity || 0} Attendees</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Like eventId={currentEvent._id} />
            </div>
            {/* Registration Section */}
            <div className="rounded-2xl p-6 shadow-xl bg-white/5">
              {new Date(event.startDateTime) < new Date() ? (
                <>
                  <span className="text-gray-500">
                    This event has successfully ended.
                  </span>
                  <AppButton className="text-text bg-red-500 w-full pointer-events-none">
                    Ended
                  </AppButton>
                </>
              ) : (
                <AppButton
                  onClick={() => handleRegister()}
                  buttonStyle={"manual"}
                  className="w-full"
                >
                  {" "}
                  {isRegistered ? "Registered" : "Register"}
                </AppButton>
              )}
            </div>
            <AppButton
              onClick={() => {
                console.log(id)
                return activate(id)}
              }
              buttonStyle={"manual"}
              className="w-full"
            >
              active
            </AppButton>

            {/* About Event */}
            <div className="">
              <h2 className="text-xl font-bold text-white mb-3">About Event</h2>
              <div
                className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: currentEvent.desc }}
              />
            </div>

            <div className="bg-white/5 p-6 shadow-xl rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Hosted By</h2>

              <div className="space-y-4">
                {currentEvent?.hosts?.map(({ avatar, email, name, _id }, i) => (
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
      {/* <AlertDialog stripe={stripePromise} options={options}>
        <Elements>
          <CheckoutForm />
        </Elements>
      </AlertDialog> */}
    </div>
  );
};

export default EventInfo;
