import React from "react";
import { Footer, Header, HomeNav } from "../components";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {

  return (
    <>
      <HomeNav/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
