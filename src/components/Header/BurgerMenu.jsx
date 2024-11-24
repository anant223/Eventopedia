import React from 'react'

const BurgerMenu = () => {
  return (
    <div className="relative">
      <div className="w-[40px] h-[4px] cursor-pointer space-y-2">
        <div className="w-full h-full bg-slate-200 rounded-md  "></div>
        <div className="w-full h-full bg-slate-200 rounded-md "></div>
        <div className="w-full h-full bg-slate-200 rounded-md "></div>
      </div>
    </div>
  );
}

export default BurgerMenu