// import { Button } from "@/components/ui/button"
// import { MapPin, Clock, ChevronRight } from "lucide-react"
// import { useState } from "react"
// import { isExpired } from "@/utils/commanAction"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useNavigate } from "react-router-dom";


// const  EventCard = ({ event }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const navigate = useNavigate()
//   const status = isExpired(event?.endDateTime);
//   const bgColor = status === "Expired"  ? "bg-red-500" : status === "Live" ? "bg-green-500" : "bg-blue-500";

//   console.log(event)
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//     });
//   };
//   return (
//     <div className="text-text">
//       <div className="w-full mx-auto max-w-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_0px_0px_1px_rgba(27,31,35,0.15)] bg-gray-900 rounded-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-6">
//             <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-100 bg-green-600 bg-opacity-90">
//               {event?.category}
//             </span>
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}
//             >
//               {status === "Live"
//                 ? "🔴 Live Now"
//                 : status === "Upcoming"
//                   ? "📅 Upcoming"
//                   : "⏰ Expired"}
//             </span>
//           </div>

//           <div className="mb-6">
//             <h2 className="text-2xl sm:text-3xl font-bold text-text leading-tight mb-3">
//               {event?.title}
//             </h2>
//             <div className="flex items-center gap-3">
//               <div className="flex -space-x-3 text-gray-50">
//                 <Avatar className="h-8 w-8 border-2 border-gray-900">
//                   <AvatarImage src={event?.organizerId?.avatar} />
//                   <AvatarFallback>{event?.organizerId?.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 {event?.hosts?.slice(0, 3).map((host, index) => (
//                   <Avatar
//                     key={host._id}
//                     className="h-8 w-8 border-2 border-gray-900"
//                   >
//                     <AvatarImage src={host?.avatar} />
//                     <AvatarFallback>{host?.name?.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                 ))}
//                 {event.hosts?.length > 2 && (
//                   <div className="h-8 w-8 rounded-full bg-gray-700 text-xs flex items-center justify-center border-2 border-gray-900">
//                     +{event?.hosts?.length - 2}
//                   </div>
//                 )}
//               </div>
//               <span className="text-sm text-gray-400">
//                 hosted by{" "}
//                 <span className="font-medium text-gray-200 capitalize">
//                   {event?.organizerId.name}
//                 </span>
//               </span>
//             </div>
//           </div>

//           <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
//             <div className="flex items-center gap-2">
//               <Clock className="h-4 w-4" />
//               <span>{formatDate(event?.startDate)}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <MapPin className="h-4 w-4" />
//               <span>{event?.location}</span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-4 border-t border-gray-700">
//             <div
//               style={{
//                 transform: isHovered ? "scale(1.05)" : "scale(1)",
//                 transition: "transform 0.2s ease-in-out",
//               }}
//             >
//               <span className="text-3xl font-bold text-text">
//                 ${event?.price}
//               </span>
//             </div>

//             <div
//               style={{
//                 transform: isHovered ? "scale(1.02)" : "scale(1)",
//                 transition: "transform 0.2s ease-in-out",
//               }}
//             >
//               <Button
//                 size="default"
//                 className="font-semibold"
//                 variant={event.featured ? "default" : "outline"}
//                 onClick={() => navigate(`/main/event-detail/${event._id}`)}
//               >
//                 <span>Explore</span>
//                 <ChevronRight
//                   className="ml-2 h-4 w-4"
//                   style={{
//                     transform: isHovered ? "translateX(4px)" : "translateX(0)",
//                     transition: "transform 0.3s ease-in-out",
//                   }}
//                 />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ); 
// }

// <div className="min-h-screen bg-black text-white">
//   {showNotification && (
//     <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-background to- px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-top">
//       <p className="text-sm font-semibold">Event bookmarked!</p>
//     </div>
//   )}
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

//     {/* Stats Bar */}
//     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//       <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4">
//         <div className="text-2xl font-bold text-orange-500">
//           {upcomingEvents.length}
//         </div>
//         <div className="text-sm text-gray-400">Upcoming</div>
//       </div>
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4">
//         <div className="text-2xl font-bold">{pastEvents.length}</div>
//         <div className="text-sm text-gray-400">Past Events</div>
//       </div>
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4">
//         <div className="text-2xl font-bold flex items-center gap-1">
//           <TrendingUp className="w-5 h-5 text-green-500" />
//           {liveCounter + 1234}
//         </div>
//         <div className="text-sm text-gray-400">Live Views</div>
//       </div>
//     </div>

//     {/* Upcoming Events - Timeline */}
//     <div className="mb-12">
//       <div className="flex items-center gap-3 mb-8">
//         <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
//         <h3 className="text-orange-500 font-semibold tracking-wider uppercase text-xs sm:text-sm flex items-center gap-2">
//           <span className="relative flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
//           </span>
//           Upcoming Timeline ({upcomingEvents.length})
//         </h3>
//         <div className="h-px flex-1 bg-gradient-to-r from-orange-500 via-transparent to-transparent"></div>
//       </div>

//       {events.length === 0 ? (
//         <div className="text-center py-12 text-gray-500">
//           <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
//           <p>No events found matching your filters</p>
//         </div>
//       ) : (
//         <div className="relative">
//           {/* Timeline Line */}
//           <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent transform -translate-x-1/2"></div>

//           {/* Timeline Events */}
//           <div className="space-y-8">
//             {events.map((event, index) => {
//               const isLeft = index % 2 === 0;
//               console.log(event);
//               return (
//                 <div key={event.id} className="relative">
//                   {/* Timeline Dot */}
//                   <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
//                     <div className="relative">
//                       <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-black shadow-lg shadow-orange-500/30"></div>
//                       <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></span>
//                     </div>
//                   </div>

//                   {/* Event Card */}
//                   <div
//                     className={`lg:grid lg:grid-cols-2 lg:gap-8 ${isLeft ? "" : "lg:grid-flow-dense"}`}
//                   >
//                     {/* Date Badge - Desktop */}
//                     <div
//                       className={`hidden lg:flex ${isLeft ? "justify-end" : "lg:col-start-2 justify-start"} items-start pt-4`}
//                     >
//                       <div className="text-right">
//                         <div className="inline-flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl px-6 py-4 shadow-lg">
//                           <div className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
//                             {event.month}
//                           </div>
//                           <div className="text-5xl font-bold text-white my-2">
//                             {event.date}
//                           </div>
//                           <div className="text-gray-400 text-xs uppercase">
//                             {event.day}
//                           </div>
//                           <div className="text-orange-400 text-sm font-medium mt-2 flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             {event.time}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Event Content */}
//                     <div
//                       className={`${isLeft ? "" : "lg:col-start-1 lg:row-start-1"}`}
//                     >
//                       <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-5 sm:p-6 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

//                         {/* Trending Badge */}
//                         {event.trending && (
//                           <div className="absolute top-4 right-4 bg-orange-500 px-2 py-1 rounded-full flex items-center gap-1 z-10">
//                             <TrendingUp className="w-3 h-3" />
//                             <span className="text-xs font-semibold">
//                               Trending
//                             </span>
//                           </div>
//                         )}

//                         <div className="relative">
//                           {/* Mobile Date Badge */}
//                           <div className="lg:hidden flex items-center gap-4 mb-4 pb-4 border-b border-gray-800">
//                             <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
//                               <div className="text-center">
//                                 <div className="text-xs font-semibold opacity-90">
//                                   {event.day}
//                                 </div>
//                                 <div className="text-2xl font-bold">
//                                   {event.date}
//                                 </div>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="text-orange-500 text-xs font-semibold uppercase tracking-wide">
//                                 {event.month} {event.year}
//                               </div>
//                               <div className="text-white text-sm font-medium flex items-center gap-1.5 mt-1">
//                                 <Clock className="w-3 h-3 text-orange-500" />
//                                 {event.time}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Main Content */}
//                           <div className="flex items-start gap-4 mb-4">
//                             <div className="flex-shrink-0 text-4xl sm:text-5xl opacity-80 group-hover:scale-110 transition-transform">
//                               {event.logo}
//                             </div>

//                             <div className="flex-1 min-w-0">
//                               <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
//                                 {event.title}
//                               </h4>
//                               <p className="text-sm text-gray-400 mb-3">
//                                 {event.description}
//                               </p>

//                               {/* Tags */}
//                               <div className="flex flex-wrap gap-2 mb-3">
//                                 {event.tags.map((tag, idx) => (
//                                   <span
//                                     key={idx}
//                                     className="text-xs px-3 py-1 bg-gray-800/80 rounded-full text-gray-300 border border-gray-700"
//                                   >
//                                     {tag}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Event Details */}
//                           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-800">
//                             <div className="flex items-center gap-2">
//                               <MapPin className="w-4 h-4 text-orange-500" />
//                               <span>{event.location}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <Users className="w-4 h-4 text-orange-500" />
//                               <span>{event.attendees} registered</span>
//                             </div>
//                           </div>

//                           {/* Action Buttons */}
//                           <div className="flex items-center gap-2">
//                             <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors text-sm font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40">
//                               <span>Register Now</span>
//                               <ChevronRight className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleBookmark(event.id);
//                               }}
//                               className={`p-3 rounded-lg transition-colors ${
//                                 bookmarkedEvents.includes(event.id)
//                                   ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
//                                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//                               }`}
//                             >
//                               <Bookmark className="w-5 h-5" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleShare(event);
//                               }}
//                               className="p-3 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
//                             >
//                               <Share2 className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </div>

//                         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <Button>Next</Button>
//         </div>
//       )}
//     </div>

//     {/* Past Events */}
//     {pastEvents.length > 0 && (
//       <div>
//         <div className="flex items-center gap-3 mb-6">
//           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
//           <h3 className="text-gray-500 font-semibold tracking-wider uppercase text-xs sm:text-sm">
//             Past Events ({pastEvents.length})
//           </h3>
//           <div className="h-px flex-1 bg-gradient-to-r from-gray-700 via-transparent to-transparent"></div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {pastEvents.map((event) => (
//             <div
//               key={event.id}
//               className="group relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 rounded-2xl p-5 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-80"
//             >
//               <div className="relative">
//                 <div className="flex items-start gap-3 mb-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-xs font-semibold opacity-70">
//                           {event.day}
//                         </div>
//                         <div className="text-lg font-bold">{event.date}</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-base font-medium text-gray-300 mb-1">
//                       {event.title}
//                     </h4>
//                     <p className="text-xs text-gray-500 line-clamp-2 mb-2">
//                       {event.description}
//                     </p>

//                     <div className="flex flex-wrap gap-1 mb-2">
//                       {event.tags.slice(0, 2).map((tag, idx) => (
//                         <span
//                           key={idx}
//                           className="text-xs px-2 py-0.5 bg-gray-800/50 rounded-full text-gray-500"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex-shrink-0 text-2xl opacity-50">
//                     {event.logo}
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
//                   <div className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     <span>{event.time}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <MapPin className="w-3 h-3" />
//                     <span className="truncate max-w-[100px]">
//                       {event.location}
//                     </span>
//                   </div>
//                 </div>

//                 <button className="w-full flex items-center justify-center gap-1 text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors py-2 border border-gray-800 rounded-lg hover:border-gray-700">
//                   <span>View Recording</span>
//                   <ChevronRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// </div>;
// export default EventCard


