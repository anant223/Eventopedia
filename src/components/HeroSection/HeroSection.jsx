import React from 'react'
import {Container} from "../index.js"
import { ArrowRight } from "lucide-react";
import Button from '../Button/Button.jsx';

const HeroSection = () => {
  return (
    <section className="min-h-[100vh] flex items-center h-screen text-[#FFFFFF] font-roboto py-12  bg-radial-blue ">
      <Container>
        <div className=" w-full flex justify-center ">
          <div className="text-center max-w-2xl ">
            <h2 className="lg:text-6xl font-bold mb-6 leading-tight text-[42px]">
              {" "}
              Connect, Collaborate, and Learn
            </h2>
            <p className="sm:text-2xl mb-8 max-w-xl mx-auto text-[18px] text-2xl">
              {" "}
              Organize group meetings or get one-on-one help, all in one dynamic
              platform.
            </p>
            <div className=" text-white">
              <Button
                name="Get Started"
                icon={
                  <ArrowRight className=" ml-1 text-white relative bottom-0.5" />
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection
