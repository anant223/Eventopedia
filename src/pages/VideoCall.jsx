import React from 'react'
import { useNavigate,  } from 'react-router-dom';
import video from ".././assets/video.mp4"
const VideoCall = () => {
  const navgate = useNavigate()
  console.log(navgate.name);
  return (
    <div className=" w-full h-screen bg-gray-white text-white py-24 relative">
      <video
        src={video}
        autoPlay = {false}
        muted = {false}
         className=""
      />
    </div>
  );
}


export default VideoCall