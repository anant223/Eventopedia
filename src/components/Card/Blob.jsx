import React from "react";

const Blob = ({ size = "medium", className = "", icon }) => {
  const sizeClasses = {
    small: "h-16 w-16 sm:h-20 sm:w-20",
    medium: "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32",
    large: "h-48 w-48 sm:h-64 sm:w-64",

  };

  return (
    <>
      <style jsx>{`
        .blob {
          aspect-ratio: 1;
          clip-path: polygon(
            90.59% 30.45%,
            90.59% 69.55%,
            60.02% 93.92%,
            21.91% 85.22%,
            4.95% 50%,
            21.91% 14.78%,
            60.02% 6.08%,
            90.59% 30.45%
          );
        }
      `}</style>
      <div
        className={`blob bg-gradient-to-br from-[#0c1725] via-[#0e1c2f] to-[#0c1725] text-[#8bb4e9] group-hover:bg-gradient-to-tr transition-all duration-300 hover:scale-105 ${sizeClasses[size]} ${className}`}
      >
        <div className=" w-full h-full flex justify-center items-center text-[#8bb4e9]  ">
          {icon }
        </div>
      </div>
    </>
  );
};
export default Blob;