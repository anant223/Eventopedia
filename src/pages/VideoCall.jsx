import React, { useRef, useState } from 'react'
import { useNavigate,  } from 'react-router-dom';
import video from ".././assets/video.mp4"
const VideoCall = () => {
  const navgate = useNavigate()
  console.log(navgate.name);
  const valRef = useRef()
  const [isVal, setisVal] = useState(0)
  return (
    <div className=" w-full min-h-screen text-white py-16 ml-64 relative">
       Hello
    </div>
  );
}


export default VideoCall