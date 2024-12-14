import React from "react";
const Container = ({ children}) => {
  return (
    <div className=" max-w-7xl mx-auto px-4 md:px-14 lg:px-16">
      {children}
    </div>
  );
};

export default Container;
