import React from "react";
import { Link } from "react-router-dom";
import {Logo } from "../index.js";

const Header = ({
  children,
  link = "/",
  className = "sticky",
}, ref) => {
  
  return (
    <header
      ref={ref}
      className={`z-50 top-0 bg-black w-full shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      
    >
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between px-6 lg:px-8">
          <Link to={link}>
            <Logo />
          </Link>
          <div>{children}</div>
        </div>
      </div>
    </header>
  );
};

export default React.forwardRef(Header);
