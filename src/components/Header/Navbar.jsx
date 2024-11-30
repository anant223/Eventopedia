import React from 'react';
import {Container, Logo} from "../index.js"

const Navbar = () => {
  return (
    <nav className="w-full py-2 font-roboto fixed border text-white">
      <Container>
        <div className=" flex justify-between items-center">
          <Logo />
          <div className="flex gap-4 items-center">
            <div>
              <button className=" border px-3 py-2 rounded">Upgrade</button>
            </div>
            <div>
              <a href="#">My Account</a>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar