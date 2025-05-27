import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Button, Logo } from "../index.js";
import { motion } from "framer-motion";
const Header = () => {
  const [scrollDirPos, setScrollDirPos] = useState("0");
  const [countScroll, setCountScroll] = useState(0);
  const navigate = useNavigate();
  const location = useLocation()
  const lastScroll = useRef(0);
  const [state, setState] = useState(false);



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

  useEffect((() =>{
    if(state){
      document.body.style.overflow = "hidden";
    }else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = '';
    }
  }), [state])


  return (
    <header
      className={`w-full h-[80px] z-30  text-text px-2 sm:px-2 sticky transition-all duration-[600ms] ${
        countScroll > 16
          ? "backdrop-blur-md bg-black/70 shadow-lg"
          : "bg-[#05101c] text-gray-200"
      }`}
      style={{ top: scrollDirPos }}
    >
      <motion.nav
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center justify-between mx-auto px-4 md:px-8 lg:px-12 max-w-7xl h-full"
      >
        <div className="z-40 hover:opacity-80 transition duration-200">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {location.pathname === "/" && (
          <div className=" flex items-center">
            <Button
              name="Login"
              handleClick={() => navigate("/auth?type=login")}
            />
          </div>
        )}
      </motion.nav>
    </header>
  );
};

export default Header;
