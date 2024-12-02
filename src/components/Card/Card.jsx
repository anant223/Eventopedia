import { StarIcon } from 'lucide-react'
import React from 'react'

const Card = ({ img, name, number, numerOfEvents }) => {
  return (
    <div>
      <div className="text-white w-full border px-6 py-4 shadow rounded uppercase bg-gray-700">
        <div className="flex gap-4 mb-4">
          <img src={img} alt="img" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <div className="flex items-center mt-1">
              <StarIcon
                size={14}
                fill="yellow"
                className="mr-2 border-yellow-500"
              />
              {number}
            </div>
          </div>
        </div>
        <div className=" mb-4">
          <p>{numerOfEvents} events Hosted</p>
        </div>
        <div>
          <button type="button" className="bg-orange-800 p-2 rounded">
            view Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;