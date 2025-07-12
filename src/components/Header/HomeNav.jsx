import React, { useRef, useLayoutEffect } from 'react'
import {BurgerMenu, Button, Header, Logo} from '../index.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const HomeNav = () => {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const location = useLocation();
    console.log(location);
    gsap.registerPlugin(ScrollTrigger);


    useLayoutEffect(() => {
      const header = headerRef.current;
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const scrollY = window.scrollY;
            const maxScroll = ScrollTrigger.maxScroll(window)
            const isAtBottom = scrollY >= maxScroll - 10;
            gsap.to(header, {
              y: self.direction === -1 || isAtBottom ? 0 : -100,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      }, header);

      return () => ctx.revert();
    }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 sm:top-6 -translate-x-1/2 z-50 rounded-bl-2xl rounded-br-2xl sm:rounded-2xl h-14 sm:w-fit w-full max-w-4xl will-change-transform bg-[#0a1628]/95 backdrop-blur-xl border border-[#1a2332]/60  shadow-[0px_8px_32px_rgba(5,16,28,0.4),_0px_2px_8px_rgba(5,16,28,0.2),_inset_0px_1px_0px_rgba(255,255,255,0.1)]"
    >
      <nav
        className="flex items-center sm:justify-center justify-between w-full h-full space-x-6 px-2"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className=" flex-shrink-0 transition-transform hover:scale-105 duration-200"
        >
          <Logo />
        </Link>

        <div className="hidden sm:flex items-center">
          <Button
            handleClick={() => navigate("/auth?type=login")}
            name="Log in"
          />
        </div>
        <div className="sm:hidden flex items-center">
          <BurgerMenu />
        </div>
      </nav>
    </header>
  );
}

export default HomeNav