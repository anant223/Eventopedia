import React, { useEffect, useRef, useState , lazy} from "react";
import { Container, Logo, BurgerMenu, Button } from "../index.js";
import {Link, useNavigate} from "react-router-dom"


const Header = () => {
    const [scrollDirPos, setScrollDirPos] = useState("0");
    const [countScroll, setCountScroll] = useState(0);
    const navigate = useNavigate()
    const lastScroll = useRef();
    const handleJoinBtn = () =>{
        navigate("/auth")
    }
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setCountScroll(currentScroll);
            setScrollDirPos(currentScroll > lastScroll.current ? 
              "-160px" : "0"
            )
            lastScroll.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
      <header
        style={{ top: scrollDirPos }}
        className={`w-full font-roboto text-[#FFFFFF] z-20 transition-all duration-300 ease-in-out fixed`}
      >
        <nav className="flex items-center justify-between px-[22px] py-3 lg:px-8">
          <div class="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5">
              <Logo />
            </Link>
          </div>
          <div class="lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/auth"
              className="lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 font-semibold text-gray-800 hover:text-white gap-x-1"
            >
              Join Now <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
    );
};

export default Header;
//  ${
        //   countScroll >= 10 ? "bg-black" : " bg-transparent"
        // }