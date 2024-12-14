import React from 'react'
import { Button, Container } from "../index.js";
import { howitwork } from '../../utils/constant.js';
import { ArrowRight } from 'lucide-react';

const HowItWork = () => {
  return (
      <div className="py-12 text-white bg-howitWork-bg font-roboto">
          <Container>
              <div className="flex flex-col space-y-8 justify-center">
                  <div className=" text-white">
                      <h3 className="text-4xl font-bold mb-12 text-center">
                          How It Work
                      </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:flex justify-between items-center mb-8 ">
                      {howitwork.map((item, index) => (
                          <div
                              key={index}
                              className={`py-4 ${index === 2 ? "col-span-2" : ""} ${index === 1 ? "col-span-1":"" }`}
                          >
                              <div className=" flex flex-col items-center">
                                  <div className="sm:w-24 sm:h-24 w-[68px] h-[68px] rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 items-center flex justify-center sm:text-2xl text-xl font-bold mb-6">
                                      {item.step}
                                  </div>
                                  <h4 className="sm:text-2xl font-semibold mb-6 text-xl">
                                      {item.title}
                                  </h4>
                                  <p className={`text-white sm:text-base text-center`} >
                                    {item.description}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </Container>
      </div>
  );
}

export default HowItWork