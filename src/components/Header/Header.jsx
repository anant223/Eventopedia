import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Button, Container, Logo } from "../index.js";

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
      className={`sticky z-50 top-0 backdrop-blur-[0.75rem] w-full shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${
        countScroll > 16
          ? "backdrop-blur-md bg-black/70 shadow-lg"
          : "bg-[#05101c] text-gray-200"
      }`}
      style={{ top: scrollDirPos }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between px-6 lg:px-8">
          <Link to="/">
            <Logo />
          </Link>
          <div className=" hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth?type=login")}
              className=" text-[#fff] font-medium text-sm px-6 py-2 h-10 rounded-full hover:transition-all hover:duration-300 hover:ease-in hover:bg-[#fff] hover:text-gray-800"
            >
              Log In
            </button>
            <Button
              handleClick={() => navigate("/auth?type=signup")}
              name="Join Now"
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
