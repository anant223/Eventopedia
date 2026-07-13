import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AuthenticatedHeader from "@/components/headers/AuthenticatedHeader";




const MainLayout = () => {
  const [activeNav, setActiveNav] = useState("home");
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = ({route, nav}) => {
    setActiveNav(nav)
    navigate(route)
  }

   const hideOn = ["/main/create-event", "/onboarding", "/login"];
   const shouldShow = !hideOn.some((path) => location.pathname.includes(path));

  return (
    <div className="h-screen flex flex-col font-roboto bg-[#f0ede6]">
      <AuthenticatedHeader />
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
