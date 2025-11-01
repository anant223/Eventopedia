import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../app/selector/authSelector.js";
import { AuthenticatedHeader } from "../components/index.js";
import { LoadingSpinner } from "@/components/common/index.js";
import useAuth from "../hooks/useAuth.jsx";

const MainLayout = () => {
  const location = useLocation();
  const { loading } = useAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (loading) return <LoadingSpinner />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthenticatedHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
