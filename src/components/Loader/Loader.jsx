import React from 'react'

const Loader = () => {
  return (
    <div className=" flex items-center">
      <span className=" inline-block w-1 h-5 bg-text rounded-md bar1"></span>
      <span className=" h-9 m-[0_5px] inline-block w-1 bg-text rounded-md bar2"></span>
      <span className="inline-block w-1 h-5 bg-text rounded-md bar3"></span>
    </div>
  );
}

export default Loader