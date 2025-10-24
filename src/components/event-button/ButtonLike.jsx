import { useDispatch, useSelector } from "react-redux";
import likeService from "../../api/likeService";
import useAPI from "../../hooks/useAPI";
import { setEventLikes, toggleLikeAction } from "../../app/features/likeSlice";
import {selectIsLiked, selectLikesById} from "../../app/selector/likeSelector";
import { Socket } from "../../socket";
import { selectUser } from "../../app/selector/authSelector";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Heart } from "lucide-react";

const LikeButton = ({ eventId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const eventLikes = useSelector(selectLikesById(eventId));
  const isLiked = useSelector(selectIsLiked(eventId, user?.data?.data?._id));
  const location = useLocation();
  // Fetch event likes data
  const { loading } = useAPI(
    () => likeService.getEventLikes(eventId),
    setEventLikes,
    [eventId],
    (data) => {
      const userObj = {};
      data.likes.forEach(({ likedBy, createdAt }) => {
        userObj[likedBy._id] = {
          email: likedBy.email,
          name: likedBy.name,
          likedAt: createdAt,
        };
      });

      return {eventId,
        data :{
          count: data.likesCount,
          users: userObj,
        }
    }
    }
  ); 

  useEffect(() => {
    const isInEventPage = location.pathname.endsWith(eventId);

    if (isInEventPage) {
      Socket.emit("join_room", { eventId });
    } else {
      Socket.emit("leave_room", { eventId });
    }
   
    const handleLikeUpdate = (data) => {
      console.log(data);
      const {likedBy, createdAt} = data
      const userObj = {}
      userObj[likedBy._id] = {
        email: likedBy.email,
        name: likedBy.name,
        likedAt: createdAt,
      };

      dispatch(
        setEventLikes(
          {
            eventId,
            data :{
              count: data.likesCount,
              users: userObj,
            }
          }
        )
      );
    }

    Socket.on("like_update", handleLikeUpdate)

    return () => {
      Socket.off("like_update", handleLikeUpdate);
    }
    
  },[location.pathname, eventId])

  const toggleLike = async () => {
    try {
      dispatch(
        toggleLikeAction({
          eventId: eventId,
          userId: user?.data?.data?._id,
          email: user?.data?.data?.email,
          name: user?.data?.data?.name,
        })
      );
      Socket.emit("toggle_like", {eventId});
    } catch (error) {
      throw error.messages
    }
  }



  if (loading) {
    return (
      <button  className="text-gray-300 bg-black/20 backdrop-blur-sm p-2 rounded-full flex gap-1">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </button>
    );
  }

  return (
    <>
      <button       
        disabled={!user}
        onClick={toggleLike} 
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow hover:scale-105 transition"
      > 
        <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-white"}/>        
        <span className="text-gray-200">
          {isLiked ? "Liked" : "Like"}
        </span>
      </button>
      <span className="text-gray-400 text-sm">{eventLikes?.count || 0} Likes</span>        
    </>
  )
};

export default LikeButton;
