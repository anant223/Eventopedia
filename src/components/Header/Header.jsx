import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {BurgerMenu, Logo } from "../index.js";
import { motion } from "framer-motion";
const Header = () => {
  const [scrollDirPos, setScrollDirPos] = useState("0");
  const [countScroll, setCountScroll] = useState(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setCountScroll(currentScroll);
      setScrollDirPos(currentScroll > lastScroll.current ? "-160px" : "0");
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header
      className={`w-full h-[80px] z-30  text-text px-2 sm:px-2 sticky transition-all duration-[600ms] ${
        countScroll > 16
          ? "bg-black shadow-lg text-white"
          : "bg-[#05101c] text-gray-200"
      }`}
      style={{ top: scrollDirPos }}
    >
      <motion.nav initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }} 
          className="flex items-center justify-between m-[0px_auto] max-w-7xl px-4 h-full">
        <div className="">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="">
          <ul className="hidden sm:flex text-[16px] font-medium gap-6 items-center">
            <li className="">
              <Link to="/features">Features</Link>
            </li>
            <li className="">
              <Link to="/pricing">Function</Link>
            </li>
            <li className="">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li  className="inline-block bg-primary rounded-[30px] p-[14px_40px] rounded-tr-none text-[14px] font-semibold hover:rounded-tr-[30px] hover:transition-all hover:duration-300 text-black">
              <Link to="/auth">Login</Link>
            </li>
          </ul>
          <div className=" flex sm:hidden">
            <BurgerMenu />
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
