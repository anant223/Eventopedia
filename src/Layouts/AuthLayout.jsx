import React from "react";
import {Outlet } from "react-router-dom";
import { Footer, PublicHeader } from "../components";
import { PublicRoute } from "@/Routes/PublicRoute";

const AuthLayout = () => {
  return (
    <PublicRoute>
      <div className="min-h-screen flex flex-col w-full">
        <PublicHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </PublicRoute>
  );
};

export default AuthLayout;
