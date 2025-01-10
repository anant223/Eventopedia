import { StarIcon } from 'lucide-react'
import React from 'react'
import { RiInstagramFill, RiLinkedinBoxFill, RiTwitterXFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Card = ({ img, name, number, numerOfEvents }) => {
  return (
    <div className="rounded-xl border border-gray-700 shadow-lg bg-gray-700 h-full flex flex-col overflow-hidden text-gray-200 font-roboto text-lg/3 p-6">
      <div className="flex justify-center mb-4">
        <div className="bg-white p-2 rounded-full">
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      </div>
      <h2 className="text-xl/3 font-bold mb-4 text-white mx-auto">Shambhavi Mishra</h2>
      <p className="text-sm text-gray-200 leading-relaxed mb-4 text-balance mx-auto">
        Frontend Developer
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="#"
          className="bg-gray-200 p-2 rounded-full text-gray-500 hover:bg-gray-300 transition"
          aria-label="Instagram"
        >
          <RiTwitterXFill />
        </a>
        <a
          href="#"
          className="bg-gray-200 p-2 rounded-full text-gray-500 hover:bg-gray-300 transition"
          aria-label="Instagram"
        >
          <RiLinkedinBoxFill />
        </a>
        <a
          href="#"
          className="bg-gray-200 p-2 rounded-full text-gray-500 hover:bg-gray-300 transition"
          aria-label="Instagram"
        >
          <RiInstagramFill />
        </a>
      </div>
    </div>
  );
};

export default Card;