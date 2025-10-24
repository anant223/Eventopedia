import React, { useRef, useLayoutEffect, useState } from 'react'
import {Logo} from '../index.js';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppButton, HamburgerButton } from '../common/index.js';

const PublicHeader = () => {
    const [isOpend, setIsOpend] = useState(false);
    const navigate = useNavigate();
    const headerRef = useRef(null);
    
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


    const handleHamburgerButton = () => {
      setIsOpend(!isOpend);
    }
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
          <AppButton
            className="rounded-full"
            buttonStyle={"manual"}
            onClick={() => navigate("/auth?type=login")}
          >
            Log in
          </AppButton>
        </div>
        <div className="sm:hidden flex items-center relative">
          <HamburgerButton
            status={isOpend}
            handleClick={handleHamburgerButton}
          />
          <div
            className={`fixed top-0 right-0 h-screen w-1/2 z-40 bg-[#0a1628]/95 shadow-xl transition-transform duration-300 transform ${isOpend ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex flex-col justify-center items-center h-full">
              <AppButton
                buttonStyle="manual"
                onClick={() => navigate("/auth?type=login")}
              >
                Log in
              </AppButton>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default PublicHeader;