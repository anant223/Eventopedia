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
            className={`w-full font-roboto text-[#FFFFFF] fixed z-20 transition-all duration-300 ease-in-out ${
                countScroll >= 10 ? "bg-black" : " bg-transparent"
            } `}
        >
            <Container>
                <div className="flex items-center justify-between py-6">
                    <div className="font-bold">
                        <Logo />
                    </div>
                    <div className="hidden md:flex lg:flex sm:flex space-x-6 relative top-1 items-center text-base ">
                        <nav>
                            <ul className="flex items-center space-x-4">
                                <li>
                                    <Link to="/main/all-events">Features</Link>
                                </li>
                                <li>
                                    <Link to="#howitwork">How it work</Link>
                                </li>
                                <li>
                                    <Link to="#howitwork">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                        <div>
                            <Button handleClick={handleJoinBtn} name="Join" />
                        </div>
                    </div>
                    <div className=" relative lg:hidden md:hidden sm:hidden flex">
                        <BurgerMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
