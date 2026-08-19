import React from "react";
import { Outlet } from "react-router-dom";
import AuthenticatedHeader from "@/components/headers/AuthenticatedHeader";




const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col font-roboto bg-[#f0ede6]">
      <AuthenticatedHeader />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
