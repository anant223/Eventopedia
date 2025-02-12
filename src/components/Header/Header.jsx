import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Container, Logo } from "../index.js";
import { motion } from "framer-motion";
const Header = () => {
  const [scrollDirPos, setScrollDirPos] = useState("0");
  const [countScroll, setCountScroll] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const lastScroll = useRef(0);
  const domRef = useRef()

  const handleJoinBtn = () => {
    navigate("/auth");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

//  console.log(domRef.current.innerText.split(""));

  return (
    <header
      style={{ top: scrollDirPos }}
      className={`w-full font-roboto z-50 transition-all duration-300 ease-in-out sticky ${
        countScroll > 16
          ? "bg-black shadow-lg text-white"
          : "bg-transparent text-gray-200"
      }`}
    >
      <Container>
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-between py-4"
        >
          <div>
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          <div className="lg:gap-8 flex items-center">
            <ul className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 lg:gap-8">
              <li className="text-base font-semibold hover:text-gray-400">
                <Link to="/features">Features</Link>
              </li>
              <li 
                className="text-base font-semibold transition-all duration-200 hover:text-gray-400">
                <Link to="/pricing">Pricing</Link>
              </li>
            </ul>
            <div>
              <button 
                className="text-base font-semibold">
                Join Now <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </motion.nav>
      </Container>
    </header>
  );
};

export default Header;
