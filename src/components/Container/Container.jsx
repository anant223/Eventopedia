import React from "react";
const Container = ({ children}) => {
  return (
    <div className=" max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      {children}
    </div>
  );
};

export default Container;
