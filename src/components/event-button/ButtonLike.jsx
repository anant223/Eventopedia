import { Heart } from "lucide-react";
import useLike from "@/hooks/useLike";
import { toast } from "sonner";

const LikeButton = ({ eventId }) => {
  const {toggleEventLike, isLiked, likeCount, toggleLoading} = useLike()

  const handleLike = async () => {
    try {
      await toggleEventLike(eventId) 
      toast.success("Liked successfully")
    } catch (error) {
      toast.error("like went wrong try agian")
      console.log("like error", error.message)
    }
  }



  if (!toggleLoading) {
    return (
      <button  className="text-gray-300 bg-black/20 backdrop-blur-sm p-2 rounded-full flex gap-1">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </button>
    );
  }

  return (
    // <>
    //   <button       
    //     onClick={handleLike} 
    //     className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow hover:scale-105 transition"
    //   > 
    //     <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-white"}/>        
    //     <span className="text-gray-200">
    //       {isLiked ? "Liked" : "Like"}
    //     </span>
    //   </button>
    //   <span className="text-gray-400 text-sm">{likeCount || 0} Likes</span>        
    // </>
    <div>Like</div>
  )
};

export default LikeButton;
