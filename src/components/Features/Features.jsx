import React from 'react'
import {Container, FeaturesCard} from '../index.js'
import { features } from '../../utils/constant.js';
import Button from '../Button/Button.jsx';
import { ArrowRight, ForwardIcon } from 'lucide-react';
import { LeftCircleFilled, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Carousel } from "antd";

const Features = () => {
  return (
    <section className=" pt-[40px] pb-[10px] bg-[#F5F5F7] text-gray font-roboto">
      <div>
        <div className=" w-full pl-4 sm:pl-0">
          <h3 className="text-2xl lg:text-4xl lg:text-center font-bold text-gray-600">
            Powerful Features
          </h3>
        </div>
        <div className="relative w-full group pl-4 sm:pl-44 ">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:bg-gray-200 rounded-full p-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:duration-300 hover:transition sm:pl-44 ">
            <LeftCircleOutlined className="text-5xl cursor-pointer hover:opacity-75 transition-opacity" />
          </div>
          <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory group-hover:block">
            <div className="inline-flex py-8 space-x-4">
              {features?.map((item, index) => (
                <FeaturesCard
                  key={index}
                  icon={<item.icon />}
                  title={item?.title}
                  desc={item?.description}
                  bgColor={item?.color}
                />
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:bg-gray-200 rounded-full p-2 hover:duration-300 hover:transition  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <RightCircleOutlined className="text-5xl cursor-pointer hover:opacity-75 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features