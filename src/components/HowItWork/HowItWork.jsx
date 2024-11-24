import React from 'react'
import { Button, Container } from "../index.js";
import { howitwork } from '../../utils/constant.js';
import { ArrowRight } from 'lucide-react';

const HowItWork = () => {
  return (
    <div className=" py-12 bg-black text-white">
      <Container>
        <div className="flex flex-col space-y-6">
          <div className=" text-white">
            <h3 className="text-4xl font-bold mb-12 text-center">
              How It Work
            </h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            {howitwork.map((item, index) => (
              <div key={index} className=" py-4">
                <div className=" flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 items-center flex justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-2xl font-semibold mb-4">{item.title}</h4>
                  <p className="text-white">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button name="Join Now" icon={<ArrowRight className="ml-2" />} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HowItWork