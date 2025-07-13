import React from 'react'

const Card = ({ desc, img, title }) => {
  return (
    <div className="group bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] rounded-xl p-6 sm:p-8 flex flex-col h-full justify-between items-center transition-all duration-300 transform hover:scale-[1.03] border border-[#1a2332]/60 backdrop-blur-sm shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(46,_26,_134,_0.3)_0px_10px_30px]">
      {/* Icon Container */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2e1a86]/20 to-[#924cdd]/20 text-[#8bb4e9] group-hover:bg-gradient-to-tr group-hover:from-[#2e1a86]/30 group-hover:to-[#924cdd]/30 transition-all duration-300">
        <div className="w-8 h-8 sm:w-10 sm:h-10 items-center flex  justify-center">{img}</div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-text group-hover:text-[#8bb4e9] transition-colors duration-300">
          {title}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300 text-text">
          {desc}
        </p>
      </div>
    </div>
  );
};



export default Card;