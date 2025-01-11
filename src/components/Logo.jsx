import React from 'react'

const Logo = ({ textColor }) => {
  return (
    <div>
      <h1
        className={`sm:text-3xl uppercase text-[2rem] inline-block leading-none font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}
      >
        Grupio
      </h1>
    </div>
  );
};

export default Logo