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
        className={`w-full font-roboto text-[#FFFFFF] z-20 transition-all duration-300 ease-in-out fixed ${countScroll > 10 ? "bg-black text-white" : "text-gray-800"}`}
      >
        <div className=" container mx-auto px-4 md:px-14 lg:px-16">
          <nav className="flex items-center justify-between py-3">
            <div class="flex lg:flex-1">
              <Link href="#" className="-m-1.5 p-1.5">
                <Logo 
                  textColor={countScroll > 10 ? "text-white" : "text-900"}
                />
              </Link>
            </div>
            <div class="lg:flex lg:flex-1 lg:justify-end">
              <Link
                to="/auth"
                className="lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 font-semibold  hover:text-gray-500 gap-x-1"
              >
                Join Now <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    );
};

export default Header;
