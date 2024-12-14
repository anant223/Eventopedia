import { StarIcon } from 'lucide-react'
import React from 'react'

const Card = ({ img, name, number, numerOfEvents }) => {
  return (
    <div>
      <div className="text-white w-full border px-6 py-4 rounded-lg uppercase bg-gray-700 shadow-md">
        <div className="">
          <div className="flex items-center  mb-4 ">
            <img src={img} alt="img" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <div className="flex items-center mt-1">
                <StarIcon
                  size={14}
                  fill="yellow"
                  className="mr-1 text-yellow-500"
                />
                <span className="text-gray-600">{number}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{numerOfEvents} events hosted</p>
          <button type="button" className="bg-orange-800 p-2 rounded w-full">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;