import React from "react";
import { Link } from "react-router-dom";

const MobileNav = ({status}) => {
    return (
      <div
        className={`fixed bg-black z-30 sm:hidden left-0 top-0 h-full right-0 text-text flex transition-transform duration-300 justify-center ${status ? "translate-x-0 " : "translate-x-full"}`}
      >
        <div className=" text-center max-w-xs font-semibold mt-[180px]">
          <ul className="px-4">
            <li className="text-4xl mb-6">
              <Link to="#features">Features</Link>
            </li>
            <li className="text-4xl mb-6">
              <Link to="#how-it-works"> How it work</Link>
            </li>
            <li className="text-4xl mb-16">
              <Link to="#">Pricing</Link>
            </li>
            <li>
              <Link
                to="/auth?type=login"
                className="inline-block bg-primary rounded-[30px] p-[14px_40px] text-[14px] font-semibold text-black"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default MobileNav;
