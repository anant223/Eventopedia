import axios from 'axios';
import { CameraIcon, Edit2Icon, EditIcon, ImageUp, UploadCloud, UploadIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const UploadAvatar = ({imgUrl}) => {
  const {handleSubmit, register} = useForm();

  const updateProfileImg = async (data) => {
    console.log("Payload:", data);

    try {
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("avatar", data?.avatar[0]);

      const response = await axios.put(
        "http://localhost:4000/api/v1/users/update_avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Response:", response.data);
      alert("You have uploaded the image successfully!");
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        alert(error.response.data.message || "Something went wrong!");
      } else {
        alert("Failed to upload the image. Please try again later.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(updateProfileImg)}>
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 group">
        <img
          src="abcd.jpg"
          alt="Avatar"
          className=" w-full h-full rounded-full ring-2 ring-white shadow-md object-cover"
        />
        <input
          type="file"
          name="avatar"
          id="file-upload"
          className="hidden"
          accept="image/png, image/jpg"
          {...register("avatar")}
        />
        <button className=" relative flex w-full justify-center -top-6 z-10">
          <UploadIcon />
        </button>
        <label
          htmlFor="file-upload"
          className="absolute inset-0 bg-gray-500/60 hover:bg-gray-600/70 rounded-full text-white flex items-center justify-center cursor-pointer group-hover:opacity-40 opacity-0"
        >
          <CameraIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
        </label>
      </div>
    </form>
  );
}

export default UploadAvatar