import React from 'react'
import { Outlet,useLocation } from 'react-router-dom';
import {Navbar, EventSidebar } from '../components/index.js';

const MainLayout = () => {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <main className="flex">
        {String(location.pathname) !== "/main/create-event" && (
          <div className="hidden sw:hidden md:hidden lg:block bg-gray-100 border-r border-gray-300 p-4 shadow-sm w-64">
            <EventSidebar />
          </div>
        )}
        <div className=" bg-white flex-grow mt-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default MainLayout