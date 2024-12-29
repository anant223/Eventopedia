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
        className={`font-roboto text-[#FFFFFF] fixed inset-0 z-50 transition-all duration-300 ease-in-out `}
      >
        <Container>
          <nav className="flex items-center justify-between p-6 lg:px-8">
            <div class="flex lg:flex-1">
              <Link href="#" class="-m-1.5 p-1.5">
                <Logo />
              </Link>
            </div>
            <div class="lg:flex lg:flex-1 lg:justify-end">
              <Link href="#" class="text-sm/6 font-semibold text-white">
                Join Now <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
        </Container>
      </header>
    );
};

export default Header;
//  ${
        //   countScroll >= 10 ? "bg-black" : " bg-transparent"
        // }