import { icons, StarIcon } from 'lucide-react'
import React from 'react'
import { FaRocket } from 'react-icons/fa';
import { RiInstagramFill, RiLinkedinBoxFill, RiTwitterXFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Card = ({desc, img, title}) => {
  return (
    <div className="bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] rounded-lg shadow-xl p-6 flex flex-col h-full justify-between items-center">
      <div className="text-primary">{img}</div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-sm text-center">{desc}</p>
    </div>
  );
};



export default Card;