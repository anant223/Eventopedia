import React from "react";
import { Footer, PublicHeader } from "../components";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {

  return (
    <>
      <PublicHeader/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
