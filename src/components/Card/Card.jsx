import { StarIcon } from 'lucide-react'
import React from 'react'
import { RiInstagramFill, RiLinkedinBoxFill, RiTwitterXFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Card = ({ img, name, number, numerOfEvents }) => {
  return (
  
      <div className="bg-[#464b5a] text-center w-[250px] rounded-[50px] p-8 shadow-md text-white">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-2 rounded-full">
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        </div>
        {/* Name */}
        <h2 className="text-2xl font-bold mb-2 text-white">Shambhavi Mishra</h2>
        {/* Bio */}
        <p className="text-sm text-gray-200 leading-relaxed mb-6">
          Shambhavi is a well-rounded web publisher with 15 years experience
          working as an art director for large corporations in the technology
          sector.
        </p>
        {/* Social Media Icons */}
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="bg-pink-200 p-2 rounded-full text-pink-700 hover:bg-pink-300 transition"
            aria-label="Instagram"
          >
            <RiTwitterXFill/>
          </a>
          <a
            href="#"
            className="bg-pink-200 p-2 rounded-full text-pink-700 hover:bg-pink-300 transition"
            aria-label="LinkedIn"
          >
            <RiLinkedinBoxFill/>
          </a>
          <a
            href="#"
            className="bg-pink-200 p-2 rounded-full text-pink-700 hover:bg-pink-300 transition"
            aria-label="TikTok"
          >
            <RiInstagramFill/>
          </a>
        </div>
      </div>
  );
};

export default Card;