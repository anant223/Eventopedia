import React from 'react'



const FeaturesCard = ({icon, title, desc, bgColor}) => {
  return (
    <div className=" bg-white bg-opacity-10 hover:bg-opacity-20 p-6 m-4 rounded-md">
      <div
        className={`w-16 h-16 mb-8 rounded-full flex  justify-center bg-gradient-to-br items-center ${bgColor}`}
      >
        {icon}
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <div>
        <p className='text-lg'>{desc}</p>
      </div>
    </div>
  );
}

export default FeaturesCard

