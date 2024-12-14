import React from 'react'

const Tag = ({title, icon}) => {
  return (
    <div>
      <a
        href="#"
        className="bg-gray-100 rounded-full leading-5 px-2 flex gap-2 font-bold text-black items-center"
      >
        <span>{icon}</span>
        <span>{title}</span>
      </a>
    </div>
  );
}

export default Tag