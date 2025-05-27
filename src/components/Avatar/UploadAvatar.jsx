import { CameraIcon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { updateProfileImg } from '../../features/profileAction.js';

const UploadAvatar = ({imgUrl}) => {
  const {handleSubmit, register} = useForm();
  return (
    <form onSubmit={handleSubmit(updateProfileImg)}>
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 group">
        <img
          src={imgUrl || ""}
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