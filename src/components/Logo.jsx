import React from 'react'

const Logo = ({ textColor }) => {
  return (
    <div>
      <h1
        className={` lg:text-[2rem] lg:leading-[54px] line uppercase text-3xl leading-[48px] inline-block font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}
      >
        Grupio
      </h1>
    </div>
  );
};

export default Logo