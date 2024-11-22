import React from 'react'
import {Container, FeaturesCard} from '../index.js'
import { features } from '../../utils/constant.js';
import Button from '../Button/Button.jsx';
import { ArrowBigLeft, ArrowBigRightDash, ArrowRight } from 'lucide-react';

const Features = () => {
  return (
    <section className=" py-12 bg-black text-white">
      <Container>
        <div className=" flex flex-col items-center w-full">
          <div className="">
            <h3 className="text-4xl font-bold mb-12 text-center">
              Powerful Features
            </h3>
          </div>
          <div className=" grid grid-cols-2  mb-8">
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
          <Button name="Join Now" icon={<ArrowRight className="ml-2" />} />
        </div>
      </Container>
    </section>
  );
}

export default Features