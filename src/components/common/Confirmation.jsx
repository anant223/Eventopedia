import { deleteEvent } from "@/features/eventActions";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Confirmation = ({userId, eventId}) => {
  const dispatch =  useDispatch()

  const handleDeleteAction = async(id) => {
    if (userId !== eventId){
      toast.error("Dude you can't delete!")
      return;
    }
    dispatch(deleteEvent(id)) 
  }

  return (
    <div className="w-[300px] h-fit bg-gray-800 rounded-[20px] flex flex-col items-center justify-center gap-5 p-[30px] relative shadow-md text-white">
      {/* Text Section */}
      <div className="w-full flex flex-col gap-1">
        <p className="text-[20px] font-bold">Want to Delete Account?</p>
        <p className="font-bold text-gray-300">
          Once you do, it won't come back
        </p>
      </div>

      <div className="w-full flex justify-between gap-3">
        <button onClick={() => onClose()} className="w-full py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition">
          Cancel
        </button>

        <button onClick={() => handleDeleteAction(eventId)} className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
          Delete
        </button>
      </div>

      <button className="absolute top-3 right-3 p-1 bg-gray-700 hover:bg-gray-600 rounded-full transition">
        <svg height="20px" viewBox="0 0 384 512" className="fill-white">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
  );
};

export default Confirmation;
