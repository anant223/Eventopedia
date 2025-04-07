import React from 'react'
import { Outlet, useLocation} from 'react-router-dom';
import {Navbar, EventSidebar } from '../components/index.js';
import {useSelector} from "react-redux"
import {selectAuthLoading, selectIsAuthenticated } from "../app/selector/authSelector.js"
import { useAuth } from '../hooks/useAuth.jsx';

const MainLayout = () => {
  const location = useLocation();
  const loading  = useAuth(); 
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <>
      <Navbar />
      <main className="flex pt-16 min-h-screen">
        {location.pathname !== "/main/create-event" && <EventSidebar />}
        <Outlet />
      </main>
    </>
  ) : null;
};


export default MainLayout