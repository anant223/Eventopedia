import React from 'react'
import { Link } from 'react-router-dom';


const Tag = ({title, icon, href}) => {
  return (
    <div>
      <Link
        to={href}
        className="bg-gray-100 rounded-full leading-5 py-1 px-3 flex gap-2 font-bold text-black items-center text-base"
      >
        <span>{icon}</span>
        <span>{title}</span>
      </Link>
    </div>
  );
}

export default Tag