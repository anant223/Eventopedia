import React, { useEffect, useRef } from 'react'
import {gsap} from "gsap"
import { SplitText } from "gsap/SplitText";


const Logo = ({ textColor }) => {
  const textRef = useRef();

  useEffect(() => {
    const textAnimation = () => {
      const text = textRef.current;
      gsap.registerPlugin(SplitText);
      let split = SplitText.create(textRef.current, {
        type: "chars, words",
      });
      split.chars.forEach((char) => {
        char.classList.add(
          "bg-gradient-to-t",
          "from-blue-500",
          "via-purple-500",
          "to-pink-500",
          "bg-clip-text",
          "text-transparent"
        );
      });
      gsap.from(split.chars, {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.05,
          from: "random"
        },

      });
    };
    textAnimation();
  }, []);
  
  return (
    <div>
      <h1
        ref={textRef}
        className="lg:text-5xl line uppercase text-3xl inline-block font-bold leading-8"
      >
        GRUPIO
      </h1>
    </div>
  );
};

export default Logo