import React from "react";
import { Outlet } from "react-router-dom";
import { AuthenticatedHeader } from "../components/index.js";
import ProtectedRoute from "@/Routes/ProtectedRoute.jsx";

const MainLayout = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <AuthenticatedHeader />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default MainLayout;
