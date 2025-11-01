import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../app/selector/authSelector.js";
import { Footer, PublicHeader } from "../components";
import { LoadingSpinner } from "@/components/common/index.js";
import useAuth from "../hooks/useAuth.jsx";

const AuthLayout = () => {
  const { loading } = useAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/main/all-events" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
