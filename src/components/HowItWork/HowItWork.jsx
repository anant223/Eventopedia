import React from 'react'
import { Button, Container, FeaturesCard } from "../index.js";
import { howitwork } from '../../utils/constant.js';
import { ArrowRight } from 'lucide-react';

const HowItWork = () => {
 

  return (
    <div className="bg-gray-800 text-white py-12 md:py-16 lg:py-24 font-roboto">
      {/* Header Section */}
      <div className=" ">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-center mb-3 md:mb-4">
          How it works
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 text-center mb-12 md:mb-16 lg:mb-20">
          Simple. Intuitive. Magical.
        </p>

        {/* Steps Section */}
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory group-hover:block pl-4 sm:pl-44">
          <div className="inline-flex py-8 space-x-4 text-gray-200 text-xl font-bold">
            {howitwork.map((step, index) => (
              <FeaturesCard
                key={index}
                icon={step.step}
                title={step.title}
                desc={step.description}
              />
            ))}
          </div>
        </div>
        <div className="text-center mt-16 md:mt-24 lg:mt-32">
          <p className="text-lg sm:text-xl text-gray-400 mb-4 md:mb-6">
            Ready to experience the difference?
          </p>
          <button className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-100 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowItWork