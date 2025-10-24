import { Upload } from 'lucide-react';
import React, { useState } from 'react'

const ImageUpload = ({error, onChange, value, register}) => {
    const [dragActive, setDragActive] = useState(false)
    const [dropFile, setDropFile] = useState()

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if(e.dataTransfer.files && e.dataTransfer.files.length > 0){        
        const files = e.dataTransfer.files
        onChange(files)
      }
    };
  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer aspect-square w-full lg:w-auto ${dragActive ? "border-white/15 bg-purple-500/10" : "border-gray-600 bg-gray-800/50 hover:border-white/30 hover:bg-purple-400/5"} h-64 sm:h-72 lg:h-72 lg:min-w-[288px]`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-3 sm:mb-4" />
        <p className="text-gray-300 font-medium text-sm sm:text-base">
          Drag & drop your image
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          PNG, JPG up to 10MB
        </p>
        {value && value[0] && (
          <p className="text-xs sm:text-sm text-green-400 mt-2">
            📁 {value[0].name}
          </p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        {...register}
      />
      {error && (
        <p className="text-red-500 text-sm p-2">{error}</p>
      )}
    </div>
  );
}

export default ImageUpload