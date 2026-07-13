import React from "react";
import {Outlet } from "react-router-dom";
import { Footer} from "../components";
import { PublicHeader } from "@/components/headers/PublicHeader";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#f0ede6] flex flex-col overflow-hidden">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
